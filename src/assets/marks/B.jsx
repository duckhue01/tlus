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
          fill="#03045e"
          fillRule="evenodd"
          d="M433.883 354.348c0 17.516-2.465 33.345-7.266 47.617-4.801 14.143-11.418 26.728-19.851 37.627-8.564 10.899-18.684 20.24-30.361 28.155-11.807 7.915-24.782 14.272-38.924 19.462-14.142 5.06-29.323 8.823-45.412 11.158-16.089 2.465-33.994 3.633-53.715 3.633H107.699c-8.304 0-15.31-2.465-21.019-7.396-5.709-4.93-8.563-12.975-8.563-24.133V41.529c0-11.158 2.854-19.203 8.563-24.133C92.389 12.465 99.396 10 107.699 10h123.259c30.101 0 55.532 2.595 76.421 7.655s38.405 12.715 52.677 22.965c14.402 10.25 25.301 23.224 32.826 38.924 7.655 15.699 11.418 34.123 11.418 55.402 0 11.937-1.557 23.095-4.541 33.604s-7.525 20.111-13.234 28.674c-5.839 8.693-12.974 16.218-21.538 22.835-8.434 6.617-18.035 11.937-28.934 15.959 13.883 2.595 26.858 7.006 38.664 13.364 11.807 6.357 22.057 14.532 30.75 24.522 8.823 9.99 15.699 21.797 20.76 35.161 5.061 13.495 7.656 28.546 7.656 45.283zM304.655 147.013c0-9.861-1.557-18.684-4.541-26.598-2.985-7.785-7.526-14.402-13.624-19.592s-13.753-9.082-22.965-11.937c-9.212-2.725-21.538-4.152-36.978-4.152h-50.342v127.671h55.662c14.402 0 25.949-1.687 34.512-5.19 8.564-3.374 15.699-8.044 21.408-14.012s9.861-12.975 12.715-20.889c2.726-8.045 4.153-16.349 4.153-25.301zm25.69 210.968c0-11.418-1.946-21.668-5.709-30.75-3.763-8.952-9.342-16.478-16.737-22.576-7.266-6.098-16.607-10.769-28.025-14.143-11.418-3.243-26.209-4.93-44.503-4.93h-59.164v140.126h72.139c13.883 0 25.56-1.427 35.161-4.411 9.472-2.854 17.646-7.266 24.652-12.975 6.877-5.709 12.326-12.715 16.348-21.278 3.891-8.433 5.838-18.164 5.838-29.063z"
          clipRule="evenodd"
          data-original="#88df8e"
        ></Path>
        <Path
          d="M176.205 222.405h55.662c15.976 0 28.483-1.933 38.236-5.909 9.853-3.89 18.234-9.401 24.912-16.381 6.489-6.784 11.5-14.996 14.896-24.409l.065-.186c3.149-9.299 4.68-18.625 4.68-28.508 0-10.866-1.744-21.002-5.204-30.179-3.625-9.456-9.17-17.405-16.48-23.626-7.046-5.997-15.709-10.535-26.487-13.874l-.123-.037c-10.236-3.028-23.631-4.563-39.814-4.563h-50.342c-5.523 0-10 4.477-10 10v127.671c-.001 5.524 4.476 10.001 9.999 10.001zm10-127.671h40.342c14.227 0 25.693 1.253 34.081 3.724 8.11 2.52 14.451 5.785 19.381 9.98 4.732 4.027 8.354 9.261 10.748 15.503 2.587 6.861 3.898 14.624 3.898 23.071 0 7.634-1.175 14.831-3.592 22-2.475 6.825-5.91 12.478-10.501 17.277-4.676 4.888-10.681 8.798-17.848 11.621l-.121.049c-7.211 2.95-17.549 4.445-30.727 4.445h-45.662V94.734zM314.327 296.995c-8.212-6.892-18.851-12.3-31.621-16.073l-.101-.029c-12.406-3.524-28.298-5.311-47.236-5.311h-59.165c-5.523 0-10 4.477-10 10v25.063c0 5.523 4.477 10 10 10s10-4.477 10-10v-15.063h49.165c17.062 0 31.098 1.526 41.719 4.536 10.095 2.988 18.297 7.092 24.447 12.252 6.185 5.1 10.725 11.229 13.86 18.688 3.283 7.924 4.947 16.982 4.947 26.922 0 9.434-1.655 17.802-4.89 24.813-3.354 7.142-7.83 12.976-13.614 17.777-6.147 5.009-13.287 8.761-21.303 11.178-8.455 2.628-19.286 3.96-32.193 3.96h-62.141l-.002-15.064c0-5.523-4.479-10-10.001-9.999-5.523 0-10 4.479-9.999 10.001l.003 25.063c0 5.522 4.478 9.999 10 9.999h72.14c15.132 0 27.604-1.59 38.047-4.836 10.45-3.149 19.898-8.128 28.153-14.855 8.05-6.682 14.447-15 19.041-24.782 4.485-9.717 6.759-20.905 6.759-33.254 0-12.58-2.177-24.213-6.49-34.624-4.376-10.419-10.968-19.307-19.525-26.362z"
          data-original="#000000"
        ></Path>
        <Path
          d="M435.58 305.525c-5.555-14.671-13.164-27.537-22.567-38.184-9.446-10.857-20.735-19.861-33.553-26.763a133.368 133.368 0 00-15.859-7.226 108.014 108.014 0 007.501-5.379c9.537-7.37 17.298-15.604 23.745-25.202a111.696 111.696 0 0014.533-31.489c3.266-11.501 4.922-23.726 4.922-36.336 0-22.756-4.182-42.871-12.4-59.725-8.252-17.217-20.38-31.6-36.01-42.724-15.279-10.972-34.172-19.236-56.156-24.562C287.995 2.67 261.491 0 230.959 0h-123.26C96.966 0 87.695 3.306 80.144 9.827c-7.981 6.892-12.027 17.558-12.027 31.702v428.942c0 14.143 4.046 24.809 12.027 31.702 7.55 6.521 16.821 9.827 27.555 9.827h130.655c20.417 0 38.999-1.261 55.151-3.736 16.542-2.401 32.471-6.317 47.42-11.667 15.463-5.674 28.89-12.394 41.09-20.572 12.55-8.506 23.523-18.685 32.659-30.313 9.046-11.691 16.25-25.328 21.42-40.559 5.168-15.363 7.788-32.456 7.788-50.805.001-17.704-2.788-34.12-8.302-48.823zm-18.432 93.225c-4.448 13.103-10.602 24.785-18.245 34.663-7.813 9.943-17.27 18.709-28.065 26.026-10.816 7.25-22.854 13.263-36.726 18.353-13.623 4.875-28.251 8.467-43.557 10.689-15.231 2.334-32.794 3.518-52.2 3.518H107.699c-5.878 0-10.615-1.624-14.483-4.964-3.384-2.922-5.1-8.496-5.1-16.565V41.529c0-8.069 1.716-13.643 5.1-16.565 3.868-3.34 8.605-4.964 14.483-4.964h123.259c28.948 0 53.867 2.481 74.066 7.374 19.469 4.717 36.021 11.906 49.233 21.394 13.055 9.291 22.739 20.772 29.636 35.159 6.905 14.161 10.406 31.327 10.406 51.02 0 10.762-1.4 21.149-4.162 30.874a91.64 91.64 0 01-11.915 25.829c-5.211 7.758-11.541 14.463-19.41 20.543-7.613 5.974-16.436 10.833-26.223 14.445a10 10 0 001.625 19.211c13.056 2.44 25.087 6.592 35.761 12.339 10.687 5.754 20.089 13.251 27.995 22.337 7.847 8.885 14.207 19.68 18.892 32.053 4.657 12.419 7.019 26.473 7.019 41.77.002 16.176-2.267 31.125-6.733 44.402z"
          data-original="#000000"
        ></Path>
        <Path
          d="M176.205 365.646c5.523 0 10-4.477 10-10s-4.477-10-10-10h-.007c-5.523 0-9.996 4.477-9.996 10s4.48 10 10.003 10z"
          data-original="#000000"
        ></Path>
      </G>
    </Svg>
  );
}

export default Icon;
