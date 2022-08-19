import {
  withApiAuth,
  getUser,
} from '@supabase/auth-helpers-nextjs';
import { getProfile } from 'api';
import { definitions } from 'api/supabase';
import { NextApiRequest } from 'next';
import { getServiceSupabase } from 'utils/serviceSupabase';

const supabaseService = getServiceSupabase()


async function isAdmin(userId: string | undefined) {
  if (!userId) return false;
  const { data, error } = await getProfile(userId)
  if (error) {
    console.error(error.message);
    return false;
  }
  return data?.role === "admin"
}

function parseBody<T>(req: NextApiRequest) {
  return new Promise<Partial<T>>((resolve, reject) => {
    try {
      const body = JSON.parse(req.body) as T
      resolve(body)
    } catch (error) {
      reject(error)
    }
  })
}

async function deleteProfile(user_id: string) {
  const result = await supabaseService.from<definitions["profiles"]>('profiles').delete({returning: "representation"}).match({user_id})
  if (result.error) throw { code: result.error.code, message: result.error.message }
  return result
}

async function deleteUser(user_id: string) {
  const result = await supabaseService.auth.api.deleteUser(user_id)
  if (result.error) throw { code: result.error.status, message: result.error.message }
  return result
}

export default withApiAuth(async function ProtectedRoute(req, res) {
  const userRes = await getUser({ req, res })
  if (userRes.error) {
    res.status(403).json(userRes.error)
  }

  if (!(await isAdmin(userRes.user.id))) {
    res.status(403).json('Unauthorized');
    return;
  }

  if (req.method === 'DELETE') {
    const body = await parseBody<{ user_id: string }>(req)
    if (!body.user_id) {
      res.status(400).json('user_id is missing');
      return;
    }
    const user_id = body.user_id
    await deleteProfile(user_id)
      .then(() => deleteUser(user_id))
      .then(({ user }) => res.status(200).json(user))
      .catch((error) => res.status(error.code).json(error.message))
  } else {
    res.status(405)
  }
});
