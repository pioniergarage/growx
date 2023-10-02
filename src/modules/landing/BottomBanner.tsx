import ParticipateButton from './ParticipateButton';
export default function BottomBanner({
    height = '4rem',
    maxHeight = '6rem',
    backgroundColor = 'rgba(0,0,0,0.7)',
    closeButtonClicked = 'false',
}) {
    return (
        <div
            className="bottom-0 left-0 right-0 w-full fixed p-4 z-50 rounded-md"
            style={{
                backgroundColor: backgroundColor || 'black',
                height: height || '150px',
                maxHeight: maxHeight || '350px',
            }}
        >
            <div className="flex flex-row justify-center align-center h-full">
                <div className="flex items-center h-full justify-center flex-row w-full">
                    <div className="flex flex-row">
                        <div className="uppercase hidden md:contents">
                            <p>Want to join Grow?</p>
                        </div>
                        <div className="uppercase hidden md:contents">
                            <p className="mx-12">--&gt;</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <ParticipateButton />
                    </div>
                    {/*                     <div
                        className="cursor-pointer px-1.5 mr-3"
                        onClick={() => (closeButtonClicked = 'true')}
                    >
                        X
                    </div> */}
                </div>
            </div>
        </div>
    );
}
