# you need to install postgresql to run this script

import os
import sys
from datetime import date

if len(sys.argv) != 2:
    print("Wrong number of arguments")
    print("Usage: python backup.py <Password>")
    exit(1)


host = 'db.gzffqettxggcszrafysw.supabase.co'
database = 'postgres'
user = 'postgres'
port = '6543'

password = sys.argv[1]
file_name = str(date.today()) + "_backup"

print("Saving backup to backup/" + file_name)
cmd = f'PGPASSWORD="{password}" pg_dump -h {host} -p {port} -U {user} -F c {database} > backups/{file_name}'

os.system(cmd)
