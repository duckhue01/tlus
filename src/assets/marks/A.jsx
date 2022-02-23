import  React from "react";
import Svg, {
  G,
  Path,
} from "react-native-svg";

function Icon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
    >
      <G xmlns="http://www.w3.org/2000/svg">
        <Path
          fill="#248232"
          fillRule="evenodd"
          d="M474.309 462.799c2.956 8.997 4.884 16.194 5.655 21.464s-.257 9.254-2.956 11.953c-2.828 2.571-7.711 4.241-14.78 4.884-6.94.643-16.708.9-28.919.9-12.853 0-22.878-.128-29.947-.514-7.197-.386-12.596-1.157-16.451-2.314-3.727-1.157-6.298-2.699-7.84-4.755-1.542-1.928-2.827-4.627-3.727-7.84l-32.003-97.937H159.547l-30.718 95.238c-1.028 3.599-2.313 6.555-3.984 8.868-1.542 2.442-4.242 4.241-7.84 5.655-3.599 1.414-8.74 2.313-15.423 2.827-6.684.515-15.424.772-26.22.772-11.567 0-20.565-.386-27.119-1.157-6.555-.771-11.053-2.57-13.495-5.398-2.57-2.956-3.47-7.069-2.699-12.339s2.699-12.21 5.655-21.078L187.823 29.536c1.414-4.242 3.213-7.711 5.27-10.282 1.928-2.699 5.141-4.627 9.511-6.041 4.498-1.414 10.539-2.313 18.379-2.699 7.712-.386 17.994-.514 30.846-.514 14.781 0 26.605.128 35.345.514 8.868.386 15.68 1.285 20.564 2.699s8.354 3.47 10.539 6.169c2.056 2.828 3.984 6.555 5.398 11.31zM250.672 104.981h-.385l-67.862 207.313h136.752z"
          clipRule="evenodd"
          data-original="#ff5a58"
        ></Path>
        <Path
          d="M489.859 482.815c-.839-5.733-2.817-13.301-6.049-23.138l-.058-.17L333.191 27.609c-1.619-5.359-3.914-10.104-6.825-14.108-.102-.14-.207-.276-.315-.411-3.499-4.322-8.724-7.512-15.532-9.483-5.712-1.653-13.206-2.662-22.903-3.083C279.406.162 268.37 0 251.829 0c-14.396 0-24.064.163-31.337.526-8.672.426-15.504 1.455-20.968 3.172-6.542 2.117-11.255 5.229-14.4 9.509-2.752 3.498-5.028 7.905-6.768 13.104l-150.1 432.437-.04.117c-3.317 9.953-5.244 17.196-6.063 22.792-1.506 10.29 1.914 16.746 5.025 20.323 4.174 4.833 10.682 7.709 19.895 8.793 7.009.826 16.262 1.227 28.289 1.227 10.997 0 20.076-.269 26.986-.8 7.996-.615 13.815-1.725 18.313-3.491 5.741-2.255 9.821-5.314 12.46-9.345 2.197-3.111 3.925-6.9 5.274-11.568l28.434-88.156h39.611c5.523 0 10-4.477 10-10s-4.477-10-10-10h-46.893a10 10 0 00-9.517 6.93l-30.718 95.238a9.171 9.171 0 00-.098.322c-.732 2.562-1.565 4.5-2.476 5.761a9.714 9.714 0 00-.334.494c-.005.007-.581.736-3.055 1.708-1.734.681-5.317 1.61-12.533 2.165-6.403.492-14.966.742-25.454.742-11.082 0-19.813-.366-25.951-1.089-5.709-.671-7.097-2.006-7.118-2.029-.52-.597-.653-2.255-.35-4.328.634-4.333 2.345-10.649 5.229-19.308L197.27 32.815l.04-.116c1.279-3.838 2.66-6.033 3.592-7.198.114-.142.223-.287.329-.435.14-.195 1.009-1.225 4.371-2.313 3.682-1.157 9.022-1.914 15.881-2.251 6.936-.347 16.295-.502 30.346-.502 16.235 0 27 .156 34.911.505 7.982.347 14.111 1.125 18.217 2.313 3.489 1.01 4.905 2.151 5.425 2.714 1.527 2.175 2.774 4.868 3.708 8.01.044.148.092.295.143.441l150.604 432.022c2.813 8.571 4.574 15.199 5.233 19.705.288 1.968.082 2.961-.06 3.303-.722.464-3.027 1.613-8.704 2.129-6.232.577-15.39.857-27.997.857-14.006 0-23.074-.154-29.412-.5-6.267-.335-11.015-.977-14.022-1.878-2.018-.626-2.729-1.166-2.855-1.272a6.207 6.207 0 00-.141-.18c-.254-.318-1.144-1.567-1.906-4.29a9.632 9.632 0 00-.124-.409l-32.003-97.938a10 10 0 00-9.505-6.894h-46.9c-5.523 0-10 4.477-10 10s4.477 10 10 10h39.647l29.688 90.854c1.255 4.394 3.068 8.11 5.392 11.053 2.834 3.713 7.018 6.39 12.87 8.205 4.682 1.405 10.829 2.295 18.78 2.721 6.705.366 16.108.529 30.492.529 13.229 0 22.989-.308 29.825-.94 9.281-.844 16.019-3.279 20.601-7.443.117-.107.232-.216.344-.328 3.491-3.493 7.329-9.879 5.779-20.474z"
          data-original="#000000"
        ></Path>
        <Path
          d="M327.282 318.152a10.003 10.003 0 001.39-8.996l-68.504-207.313a10 10 0 00-9.495-6.862h-.386a10 10 0 00-9.504 6.889l-67.862 207.313a10 10 0 009.504 13.111h136.752c3.21 0 6.225-1.54 8.105-4.142zM196.22 302.294l54.304-165.892 54.817 165.892zM251.444 378.639h-.007c-5.523 0-9.996 4.477-9.996 10s4.48 10 10.003 10 10-4.477 10-10-4.477-10-10-10z"
          data-original="#000000"
        ></Path>
      </G>
    </Svg>
  );
}

export default Icon;