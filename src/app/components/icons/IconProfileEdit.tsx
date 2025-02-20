interface IconProps {
  className?: string;
}

function IconProfileEdit({ className }: IconProps) {
  return (
    <svg
      className={className || ''}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="11"
        r="10"
        fill="#334155"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <path
        d="M11.0138 7.18948C11.1184 6.96402 11.3855 6.86677 11.6106 6.97227L13.5474 7.88027C13.7724 7.98576 13.8701 8.25405 13.7655 8.47951L11.0842 14.2603C11.0333 14.3701 10.9404 14.4546 10.8265 14.4947L9.41759 14.9904C9.18717 15.0714 8.93393 14.9527 8.84758 14.7231L8.31965 13.3195C8.27696 13.2059 8.2816 13.0801 8.33252 12.9703L11.0138 7.18948Z"
        fill="#64748B"
      />
      <path
        d="M9.125 7.38086L14.4887 9.89734"
        stroke="#334155"
        strokeWidth="0.5625"
      />
    </svg>
  );
}

export default IconProfileEdit;
