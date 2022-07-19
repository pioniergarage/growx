import { Flex, FlexProps } from "@chakra-ui/react";
import { PropsWithChildren, PropsWithoutRef, PropsWithRef } from "react";

const template = `
<svg viewBox="0 -20 210 297" version="1.1" xmlns:svg="http://www.w3.org/2000/svg" width="10rem" >
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
    </defs>
    <g inkscape:label="Logo" inkscape:groupmode="layer" id="layer1" style="display:inline;" >
        <path style="stroke-width:0.264583"
            d="m 114.37759,145.33725 c -0.40968,2.70383 -0.57147,6.35089 -0.58405,8.27104 -0.13672,20.86987 0.9027,35.94741 3.67799,49.96959 2.16309,7.52027 5.74649,9.25031 11.25678,11.03804 4.81676,1.56272 12.13004,3.71171 14.15342,8.1729 1.34885,2.97397 9.06913,7.36714 13.48571,10.81359 28.2047,17.37041 -81.797081,24.68248 -85.480398,5.39176 -0.172336,-6.43235 12.907301,-14.90332 20.468625,-17.53118 13.881043,-4.82419 15.261933,-7.3946 16.712163,-10.88977 0.76754,-43.42102 -1.65503,-25.9003 0.0791,-62.46039 -2.05521,-12.71437 5.43791,-12.13767 6.23066,-2.77558 z"
            id="logo-base" sodipodi:nodetypes="cscssccsccc" />
        <path
            d="m 93.843858,173.25334 c -4.569443,3.03516 -24.61671,28.86625 -51.81975,-2.42809 -15.59607,-17.94168 -14.65915,-21.01255 -14.65915,-21.01255 0,0 16.90647,8.00155 34.00418,0.78663 17.09771,-7.21492 31.39806,-3.3713 45.536602,10.94443 0,0 2.90287,1.01185 3.41226,4.28825 0.6921,4.45157 -0.59797,21.70174 -0.70242,23.86068 -0.10228,2.11413 -2.17011,-13.98788 -2.62764,-17.17926 -1.1409,-7.95807 -12.233332,-15.67381 -34.160052,-7.94925 15.33617,-0.43715 28.606322,3.80802 30.306642,3.80802 -6.723462,2.75403 -7.636658,3.7825 -9.290672,4.88114 z"
            style="stroke-width:0.264583" id="logo-left" sodipodi:nodetypes="sscscsssccs" />
        <path
            d="m 118.11811,144.77711 c 0.21653,-19.15525 14.54376,-28.76394 23.34308,-32.18371 22.48305,-8.73782 23.2572,-15.52524 23.55622,-14.94682 2.87757,5.56635 1.70442,50.05347 -29.39579,51.35074 -3.32065,0.13851 -7.24053,-0.10669 -15.51503,3.15909 -8.2745,3.26577 -5.16834,32.55078 -6.41247,34.64475 -2.35162,3.95794 -5.07722,-26.75478 -2.36708,-31.17158 -0.007,-1.90422 22.99358,-21.37345 27.43152,-25.44495 -7.58066,-0.22059 -16.07438,11.24317 -20.64045,14.59248 z"
            style="stroke-width:0.264583" id="logo-right" />
        <path
            d="m 108.69895,152.1814 c 0,0 -0.93781,-29.66507 -29.034149,-53.640908 -0.41555,2.829778 3.07353,8.104138 10.92354,19.764678 10.345609,15.36758 14.161619,26.71831 15.039369,32.51815 -0.56009,0.62076 -7.472629,-7.4835 -23.023049,-10.3892 -52.38131,-9.78778 -36.25752,-101.958245 -27.62559,-119.005283 0,0 8.33425,43.960853 42.64892,60.700033 26.874169,13.109611 19.154289,50.78107 16.247409,68.84809"
            style="stroke-width:0.264583" id="logo-top" />
    </g>
</svg>

<style>
#logo-left {
    animation: 3s infinite rotate1 cubic-bezier( 0.33, 0, 0.56, 1 );
    transform-origin: center;
}

#logo-right, #logo-top {
    animation: 2s infinite rotate2 cubic-bezier( 0.33, 0, 0.56, 1 );
    transform-origin: center;
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

export default function AnimatedLogo(props: FlexProps) {
  return (
    <Flex
      alignItems="center"
      {...props}
      dangerouslySetInnerHTML={{ __html: template }}
    />
  );
}
