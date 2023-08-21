export const Iconcem = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg className={className} width={size} height={size / 3} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 6.59971C0 2.95479 2.95479 0 6.5997 0H113.4C117.045 0 120 2.95479 120 6.59971V33.4003C120 37.0452 117.045 40 113.4 40H6.59971C2.95479 40 0 37.0452 0 33.4003V6.59971Z"
        fill="#1E6DB4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.1788 7.05277C31.2033 7.1563 33.9597 7.37629 37.8548 7.90038C39.5112 8.12038 39.7118 8.19802 39.8542 8.66388C39.9059 8.85152 39.9253 10.8315 39.9253 16.0595C39.9253 22.7045 39.9124 23.2157 39.8089 23.4227C39.6406 23.7592 39.4012 23.8951 39.0065 23.9015C38.8189 23.9015 37.4148 23.8627 35.8814 23.811C29.5728 23.6104 23.083 24.0827 16.5997 25.215L16.5764 25.2192C15.2474 25.4544 15.2396 25.4558 15.0016 25.6938C14.788 25.9009 14.7557 25.9721 14.7557 26.2309C14.7557 26.4767 14.7945 26.5673 14.9692 26.7614C15.1763 26.9879 15.2151 27.0008 16.1792 27.182C19.9384 27.8743 24.1053 28.3596 28.5052 28.612C30.278 28.709 36.3472 28.7155 37.9842 28.612C39.136 28.5408 39.1942 28.5473 39.453 28.6702C39.893 28.8837 39.9383 29.0843 39.9124 30.7213C39.893 31.983 39.88 32.0995 39.7571 32.2677C39.5112 32.6042 39.3754 32.6365 36.7613 32.9665C28.6475 33.9953 19.6732 33.9241 11.6499 32.7659C10.4853 32.5977 10.3106 32.5395 10.1165 32.2418C10.0065 32.0736 9.99999 31.4395 9.99999 20.414C9.99999 10.7085 10.0129 8.73506 10.0906 8.56036C10.2394 8.19802 10.4659 8.11391 11.8117 7.93274C15.681 7.41511 19.932 7.08512 23.4907 7.03336C24.0406 7.02689 24.5647 7.01395 24.6553 7.00101C24.7459 6.99454 25.8782 7.02042 27.1788 7.05277ZM62.4745 7.05277C65.3732 7.18217 67.9484 7.3957 70.6271 7.73862C73.0341 8.04273 73.1764 8.07508 73.4223 8.45683C73.5323 8.61859 73.5388 8.96799 73.5582 13.3355L73.5591 13.5918V13.5918V13.5919C73.5752 17.8406 73.5771 18.3513 73.3238 18.5833C73.2892 18.6149 73.2498 18.6414 73.205 18.6715L73.1829 18.6864L72.9564 18.8417L71.3389 18.7835C68.9707 18.7059 63.3933 18.7253 61.8274 18.8159C60.0934 18.9194 57.7511 19.12 56.263 19.2882C54.5612 19.4758 51.5008 19.9223 51.2937 19.9999C50.6726 20.2523 50.6143 21.1516 51.2031 21.4622C51.6561 21.6952 56.5218 22.3098 59.8216 22.5492C63.1345 22.7886 67.8772 22.8533 71.2159 22.7045C72.8464 22.6269 72.9176 22.6269 73.1247 22.7498C73.5194 22.9763 73.5711 23.1833 73.5711 24.4386C73.5711 25.6679 73.5129 25.9397 73.1958 26.1726C73.0341 26.2956 72.95 26.302 71.7271 26.2697C71.0153 26.2503 68.686 26.2373 66.5508 26.2373C62.7462 26.2438 61.7369 26.2762 59.0128 26.5026C55.9588 26.755 51.572 27.3308 51.1708 27.5379C50.6273 27.8161 50.7049 28.7478 51.2937 28.9743C51.6431 29.1102 55.2083 29.5954 57.5894 29.8284C62.0992 30.2619 67.6313 30.3913 71.6883 30.1519C72.717 30.0872 72.8335 30.0937 73.0406 30.1972C73.4417 30.3978 73.5388 30.5984 73.5582 31.2713C73.5905 32.2548 73.3835 32.5006 72.4 32.6494C70.0577 32.9988 66.5896 33.3482 63.7038 33.5294C61.9116 33.6394 55.2924 33.6394 53.5454 33.5294C50.3814 33.3288 47.3598 33.0312 45.1728 32.7077C44.2152 32.5653 44.0858 32.5265 43.924 32.3712C43.8205 32.2742 43.7105 32.0865 43.6781 31.9571C43.6328 31.7954 43.6199 27.7385 43.6264 20.1746C43.6458 9.2721 43.6523 8.62506 43.7622 8.45683C44.0146 8.06861 44.1828 8.02979 47.1721 7.66745C49.605 7.37629 52.1802 7.16277 54.5807 7.05924C56.2953 6.98159 60.8375 6.98159 62.4745 7.05277ZM88.0582 7.16924C88.1812 7.22747 88.3364 7.35041 88.4012 7.44099C88.4723 7.54451 88.8605 9.07152 89.4235 11.485C89.6903 12.614 90.0512 14.1554 90.4115 15.6942L90.4149 15.7086L90.4189 15.7256L90.427 15.7605C90.743 17.1096 91.0573 18.4522 91.3063 19.5082C91.5686 20.6338 91.8276 21.7389 92.0335 22.6173L92.0363 22.6292L92.0366 22.6304L92.0379 22.636L92.0385 22.6384C92.2467 23.5265 92.3997 24.1791 92.4451 24.3804C92.6392 25.1956 92.7557 25.435 93.0598 25.6291C93.461 25.875 94.0174 25.655 94.2051 25.1762C94.2374 25.0856 94.6192 23.4357 95.0527 21.514C95.2764 20.5222 95.5312 19.3874 95.7591 18.3719C95.9729 17.4198 96.1631 16.5726 96.282 16.0465C96.5279 14.9595 97.052 12.6302 97.4467 10.8703C97.8479 9.11034 98.2167 7.58334 98.2749 7.47981C98.3331 7.37629 98.4884 7.24041 98.6114 7.16924C98.8314 7.05277 99.0578 7.05277 104.111 7.06571C109.145 7.08512 109.391 7.09159 109.585 7.20806C109.619 7.22859 109.651 7.24092 109.68 7.25224L109.68 7.25225C109.701 7.26072 109.721 7.26862 109.74 7.27897C110.002 7.42333 110.002 8.04339 110 17.3087V17.3303C109.999 18.2582 109.999 19.2726 109.999 20.3817C109.999 32.9859 109.999 33.083 109.87 33.29C109.65 33.6459 109.488 33.6782 107.786 33.6782C106.33 33.6782 106.246 33.6718 106.072 33.5424L106.055 33.5299C106.008 33.4956 105.968 33.4662 105.934 33.4312C105.729 33.2208 105.729 32.8094 105.729 29.925V29.7313C105.729 26.3667 105.729 26.3603 105.586 26.0756C105.476 25.8621 105.36 25.7456 105.127 25.6291C104.855 25.4932 104.706 25.4674 103.885 25.4415C102.849 25.4091 102.228 25.4803 101.536 25.7132C100.274 26.1468 99.239 26.9426 98.5143 28.049C97.9902 28.8384 97.8673 29.1878 97.3691 31.1936C97.1232 32.2159 96.8644 33.1412 96.7997 33.2447L96.7757 33.2844C96.7322 33.3567 96.6967 33.4157 96.6501 33.4639C96.4422 33.6786 96.0125 33.6785 93.6685 33.6783L93.4027 33.6782C90.724 33.6782 90.4717 33.6718 90.3099 33.5618C90.2129 33.5035 90.0964 33.3806 90.0382 33.303C89.954 33.1671 89.5658 31.6336 88.6082 27.6285C88.22 26.0044 88.1682 25.875 87.9094 25.6291C87.7606 25.4868 87.6635 25.4674 87.1653 25.4415C84.7778 25.325 82.5455 26.7161 81.5685 28.929C81.2385 29.6796 81.135 30.2878 81.1026 31.7048C81.0638 33.1671 81.025 33.3353 80.6691 33.5553C80.4815 33.6653 80.3262 33.6782 78.8962 33.6782C77.4145 33.6782 77.3239 33.6718 77.1492 33.5424C77.1226 33.5226 77.0978 33.5086 77.0749 33.4955C77.0583 33.4862 77.0427 33.4773 77.0279 33.4672C76.7725 33.2924 76.7725 32.7443 76.7738 22.7259L76.7739 20.3493C76.7739 7.86156 76.7739 7.66745 76.9034 7.47981C76.9681 7.37629 77.1428 7.24041 77.2916 7.1757C77.5374 7.05924 77.8416 7.05277 82.6943 7.05277C87.463 7.05277 87.8512 7.05924 88.0582 7.16924Z"
        fill="white"
      />
    </svg>
  );
};