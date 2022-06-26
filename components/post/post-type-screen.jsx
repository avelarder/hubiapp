import { XIcon } from "@heroicons/react/solid";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import PostTile from "./post-tile";

export default function PostTypeScreen({
  postOptions,
  onCurrentOptionChange,
  onCancel,
}) {
  const handleCurrentOptionChange = (type) => {
    onCurrentOptionChange(type);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-evenly flex-wrap ">
        <PostTile
          type={postOptions.find((x) => x.key === "news")}
          onClick={handleCurrentOptionChange}
        >
          <div className="flex flex-col justify-start items-center h-full mt-10">
            <div className="flex flex-col justify-center items-center">
              <svg
                width="35"
                height="39"
                viewBox="0 0 35 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.625 4.5H25V0.75H21.25V4.5H13.75V0.75H10V4.5H4.375C2.30687 4.5 0.625 6.18187 0.625 8.25V34.5C0.625 36.5681 2.30687 38.25 4.375 38.25H30.625C32.6931 38.25 34.375 36.5681 34.375 34.5V8.25C34.375 6.18187 32.6931 4.5 30.625 4.5ZM4.375 34.5V10.125H30.625V8.25L30.6288 34.5H4.375Z"
                  fill="black"
                />
                <path
                  d="M8.125 13.875H26.875V17.625H8.125V13.875ZM8.125 21.375H17.5V25.125H8.125V21.375Z"
                  fill="black"
                />
              </svg>
              <span className="font-bold">{"Publicación"}</span>
            </div>
            <div className="flex w-full justify-center items-center text-sm text-center">
              {"Publica un informe, avisos, encuesta, etc."}
            </div>
          </div>
        </PostTile>
        <PostTile
          type={postOptions.find((x) => x.key === "marketplace")}
          onClick={handleCurrentOptionChange}
        >
          <div className="flex flex-col justify-start items-center h-full mt-10">
            <div className="flex flex-col justify-center items-center">
              <svg
                width="35"
                height="39"
                viewBox="0 0 35 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.625 19.5H26.875V30.75H15.625V19.5Z" fill="black" />
                <path
                  d="M30.625 4.5H26.875V0.75H23.125V4.5H11.875V0.75H8.125V4.5H4.375C2.30687 4.5 0.625 6.18187 0.625 8.25V34.5C0.625 36.5681 2.30687 38.25 4.375 38.25H30.625C32.6931 38.25 34.375 36.5681 34.375 34.5V8.25C34.375 6.18187 32.6931 4.5 30.625 4.5ZM30.6269 34.5H4.375V12H30.625L30.6269 34.5Z"
                  fill="black"
                />
              </svg>

              <span className="font-bold">{"Evento"}</span>
            </div>
            <div className="flex w-full justify-center items-center text-sm text-center">
              {"Programa una reunión, asamblea, evento deportivo, etc. "}
            </div>
          </div>
        </PostTile>
        <PostTile
          type={postOptions.find((x) => x.key === "event")}
          onClick={handleCurrentOptionChange}
        >
          <div className="flex flex-col justify-start items-center h-full mt-10">
            <div className="flex flex-col justify-center items-center">
              <svg
                width="103"
                height="39"
                viewBox="0 0 103 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8313 1.29375C20.6569 1.11801 20.4496 0.97852 20.2211 0.883329C19.9926 0.788137 19.7475 0.739128 19.5 0.739128C19.2525 0.739128 19.0074 0.788137 18.7789 0.883329C18.5504 0.97852 18.3431 1.11801 18.1688 1.29375L1.29376 18.1688C1.11802 18.3431 0.978527 18.5504 0.883336 18.7789C0.788145 19.0074 0.739136 19.2525 0.739136 19.5C0.739136 19.7475 0.788145 19.9926 0.883336 20.2211C0.978527 20.4496 1.11802 20.6569 1.29376 20.8312C1.46896 21.005 1.67674 21.1425 1.90518 21.2358C2.13363 21.3291 2.37825 21.3764 2.62501 21.375H4.50001V34.5C4.50001 35.4946 4.8951 36.4484 5.59836 37.1516C6.30162 37.8549 7.25545 38.25 8.25001 38.25H30.75C31.7446 38.25 32.6984 37.8549 33.4017 37.1516C34.1049 36.4484 34.5 35.4946 34.5 34.5V21.375H36.375C36.8723 21.375 37.3492 21.1775 37.7008 20.8258C38.0525 20.4742 38.25 19.9973 38.25 19.5C38.2514 19.2532 38.2041 19.0086 38.1108 18.7802C38.0175 18.5517 37.88 18.344 37.7063 18.1688L20.8313 1.29375ZM8.25001 34.5V16.5187L19.5 5.26875L30.75 16.5187V34.5H8.25001Z"
                  fill="black"
                />
                <path
                  d="M100.375 15.75H66.625C66.1277 15.75 65.6508 15.9475 65.2992 16.2992C64.9475 16.6508 64.75 17.1277 64.75 17.625C64.7501 20.9162 65.6165 24.1495 67.2621 26.9997C68.9078 29.85 71.2747 32.2169 74.125 33.8625V36.375C74.125 36.8723 74.3225 37.3492 74.6742 37.7008C75.0258 38.0525 75.5027 38.25 76 38.25H91C91.4973 38.25 91.9742 38.0525 92.3258 37.7008C92.6775 37.3492 92.875 36.8723 92.875 36.375V33.8625C95.7253 32.2169 98.0922 29.85 99.7379 26.9997C101.384 24.1495 102.25 20.9162 102.25 17.625C102.25 17.1277 102.052 16.6508 101.701 16.2992C101.349 15.9475 100.872 15.75 100.375 15.75ZM90.1562 31.05C89.8442 31.2072 89.5823 31.4486 89.4001 31.7467C89.2178 32.0449 89.1226 32.3881 89.125 32.7375V34.5H77.875V32.7375C77.8774 32.3881 77.7822 32.0449 77.5999 31.7467C77.4177 31.4486 77.1558 31.2072 76.8438 31.05C74.6255 29.9532 72.713 28.3246 71.2768 26.3093C69.8406 24.2941 68.9253 21.9548 68.6125 19.5H98.3875C98.0747 21.9548 97.1594 24.2941 95.7232 26.3093C94.287 28.3246 92.3745 29.9532 90.1562 31.05ZM77.875 13.875V11.8687C77.8722 9.66306 77.0115 7.54495 75.475 5.9625C75.0403 5.52323 74.6971 5.00203 74.4654 4.42911C74.2336 3.85619 74.1179 3.24297 74.125 2.625V0.75H70.375V2.625C70.368 4.84366 71.2294 6.977 72.775 8.56875C73.6438 9.44684 74.1293 10.6335 74.125 11.8687V13.875H77.875ZM85.375 13.875V11.8687C85.3722 9.66306 84.5115 7.54495 82.975 5.9625C82.5403 5.52323 82.1971 5.00203 81.9654 4.42911C81.7336 3.85619 81.6179 3.24297 81.625 2.625V0.75H77.875V2.625C77.8778 4.83069 78.7385 6.9488 80.275 8.53125C80.7097 8.97052 81.0529 9.49172 81.2846 10.0646C81.5164 10.6376 81.6321 11.2508 81.625 11.8687V13.875H85.375ZM92.875 13.875V11.8687C92.8722 9.66306 92.0115 7.54495 90.475 5.9625C90.0403 5.52323 89.6971 5.00203 89.4654 4.42911C89.2336 3.85619 89.1179 3.24297 89.125 2.625V0.75H85.375V2.625C85.3778 4.83069 86.2385 6.9488 87.775 8.53125C88.2097 8.97052 88.5529 9.49172 88.7846 10.0646C89.0164 10.6376 89.1321 11.2508 89.125 11.8687V13.875H92.875Z"
                  fill="black"
                />
              </svg>
              <span className="font-bold">{"Compra Venta"}</span>
            </div>
            <div className="flex w-full justify-center items-center text-sm text-center">
              {"Publica un informe, avisos, encuesta, etc."}
            </div>
          </div>
        </PostTile>
        <PostTile
          type={postOptions.find((x) => x.key === "rent")}
          onClick={handleCurrentOptionChange}
        >
          <div className="flex flex-col justify-start items-center h-full mt-10">
            <div className="flex flex-col justify-center items-center">
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 0.75C15.7916 0.75 12.1665 1.84967 9.08305 3.90994C5.99963 5.97022 3.5964 8.89857 2.17725 12.3247C0.758109 15.7508 0.386796 19.5208 1.11027 23.1579C1.83374 26.7951 3.61951 30.136 6.24174 32.7583C8.86398 35.3805 12.2049 37.1663 15.8421 37.8897C19.4792 38.6132 23.2492 38.2419 26.6753 36.8227C30.1014 35.4036 33.0298 33.0004 35.09 29.9169C37.1503 26.8335 38.25 23.2084 38.25 19.5C38.25 17.0377 37.765 14.5995 36.8227 12.3247C35.8805 10.0498 34.4993 7.98285 32.7582 6.24175C31.0171 4.50065 28.9502 3.11953 26.6753 2.17726C24.4005 1.23498 21.9623 0.75 19.5 0.75ZM19.5 34.5C16.5333 34.5 13.6332 33.6203 11.1664 31.972C8.6997 30.3238 6.77712 27.9811 5.6418 25.2403C4.50649 22.4994 4.20944 19.4834 4.78821 16.5736C5.36699 13.6639 6.7956 10.9912 8.89339 8.8934C10.9912 6.79561 13.6639 5.367 16.5736 4.78822C19.4834 4.20944 22.4994 4.50649 25.2402 5.64181C27.9811 6.77712 30.3238 8.69971 31.972 11.1664C33.6203 13.6332 34.5 16.5333 34.5 19.5C34.5 23.4782 32.9196 27.2936 30.1066 30.1066C27.2936 32.9196 23.4782 34.5 19.5 34.5Z"
                  fill="black"
                />
                <path
                  d="M19.5 17.625C15.75 17.625 15.75 16.4438 15.75 15.75C15.75 15.0563 17.0625 13.875 19.5 13.875C21.9375 13.875 22.1062 15.075 22.125 15.75H25.875C25.8497 14.4727 25.3902 13.242 24.5724 12.2605C23.7545 11.2791 22.6268 10.6053 21.375 10.35V8.25H17.625V10.2938C13.875 10.9125 12 13.3313 12 15.75C12 17.85 12.975 21.375 19.5 21.375C23.25 21.375 23.25 22.65 23.25 23.25C23.25 23.85 22.0875 25.125 19.5 25.125C16.05 25.125 15.75 23.5125 15.75 23.25H12C12 24.975 13.2375 28.0312 17.625 28.725V30.75H21.375V28.725C25.125 28.0875 27 25.6688 27 23.25C27 21.15 26.025 17.625 19.5 17.625Z"
                  fill="black"
                />
              </svg>

              <span className="font-bold">{"Alquiler"}</span>
            </div>
            <div className="flex w-full justify-center items-center text-sm text-center">
              {
                "Publica el alquiler de departamento, casa, cochera, anticresis, etc."
              }
            </div>
          </div>
        </PostTile>
      </div>
      <div className="flex w-full justify-center mt-4">
        <StyledSecondaryButton
          autoFocus
          type="button"
          className="inline-flex justify-center items-center h-10 "
          onClick={onCancel}
        >
          <XIcon className="w-5 h-5 mr-2"></XIcon>Cerrar
        </StyledSecondaryButton>
      </div>
    </div>
  );
}