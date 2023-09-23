import { Box, Icon, IconProps } from '@chakra-ui/react';

const style = `
<style>
#logo-left {
    animation: 3s infinite rotate1 cubic-bezier( 0.3, 0, 0.6, 1 );
    transform-origin: 110px 170px;
}

#logo-right, #logo-top {
    animation: 2s infinite rotate2 cubic-bezier( 0.3, 0, 0.6, 1 );
}

#logo-right {
    transform-origin: 111px 165px;
}

#logo-top {
    transform-origin: 109px 145px;
}

#logo-top {
    animation-duration: 5s;
}

@keyframes rotate1 {
    from {
        transform: rotateZ(-5deg);
    }

    50% {
        transform: rotateZ(2deg);
    }

    to {
        transform: rotateZ(-5deg);
    }
}
@keyframes rotate2 {
    from {
        transform: rotateZ(-2deg);
    }

    50% {
        transform: rotateZ(6deg);
    }

    to {
        transform: rotateZ(-2deg);
    }
}
</style>
`;
const AnimatedLogo: React.FC<IconProps> = (props) => {
    return (
        <>
            <Box dangerouslySetInnerHTML={{ __html: style }} />
            <Icon viewBox="-15 10 245 245" boxSize={8} fill="white" {...props}>
                <path
                    d="m 114,145 c -0.5,2.7 -0.6,6.4 -0.6,8.3 -0.1,20.9 0.9,35.9 3.7,49.9 2.9,7.7 5.9,9.1 11.8,11.4 4.6,1.2 12.4,3.1 14.2,8.9 1.5,2.7 9.3,7.4 13.1,10.9 28.7,17.1 -81.1,24.8 -85.8,5.6 -0.6,-6.5 12.1,-14.2 20.5,-17.8 13.3,-4.9 15.3,-7.6 16.3,-10.7 0.4,-43.2 -1.3,-25.3 0.1,-62.9 -2.1,-12.7 5.1,-12.7 6.6,-2.8 z"
                    id="logo-base"
                />
                <path
                    d="m 93,173 c -4.3,3.6 -24.1,28.5 -51.5,-2.9 -15.7,-17.8 -14.5,-21.5 -14.5,-21.5 0,0 16.7,8.5 34.8,0.3 17.1,-7.2 31.6,-3.3 45.2,10.3 0,0 2.7,1.5 3.6,4.5 0.1,4.7 -0.7,21.4 -0.2,23.8 -0.8,2.3 -2.1,-13.8 -2.4,-17.6 -1.9,-7.7 -12.2,-15.1 -34.2,-7.5 15.7,-0.5 28.2,3.2 30.2,3.2 -6.2,2.3 -9.8,4.4 z"
                    id="logo-left"
                />
                <path
                    d="m 118,144 c 0.3,-19.5 14.6,-28.4 23.8,-32.1 22.5,-8.2 23.2,-15.4 23.2,-14.2 2.7,5.5 1.2,50.7 -29.9,51.4 -3.5,0.1 -7.3,-0.9 -15.3,3.9 -8.5,3.7 -5.4,32.8 -6.7,34.5 -2.2,3.4 -5.2,-26.8 -2.8,-31.8 -0.7,-1.2 22.8,-21.5 27.2,-25.5 -7.6,-0.9 -16.8,11.7 -20.5,14.8 z"
                    id="logo-right"
                />
                <path
                    d="m 108,152 c 0,0 -0.1,-29.7 -29.9,-53.8 -0.5,2.8 3.3,8.8 10.4,19.8 10.9,15.8 14.9,26.1 15.9,32.5 -0.9,0.6 -7.9,-7.5 -23.9,-10.2 -52.1,-9.8 -36.2,-101.5 -27.9,-119.3 0,0 8.5,43.3 42.2,60.3 26.9,13.1 19.9,50.7 16.9,68.9"
                    id="logo-top"
                />
            </Icon>
        </>
    );
};

export default AnimatedLogo;
