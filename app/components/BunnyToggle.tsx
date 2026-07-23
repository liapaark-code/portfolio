"use client";
import { useState } from "react";

/**
 * Bunny toggle switch from Figma (frames 2147226947/2147226948).
 * Off: light #e7ecff track, bunny on the right. On: #5679ff track, bunny slides left.
 * Track is 113x53 with a 1px #2d61fd border; bunny thumb keeps the exact Figma insets.
 */
export default function BunnyToggle({
  checked,
  defaultChecked = false,
  onChange,
  label = "Toggle",
  className = "",
  scale = 1,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
  scale?: number;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = checked ?? internal;

  const toggle = () => {
    const next = !isOn;
    if (checked === undefined) setInternal(next);
    onChange?.(next);
  };

  // Border sits OUTSIDE the 113×53 track (content-box) so the bunny keeps its
  // original padding no matter how thick the visible outline gets.
  const bw = Math.max(1.6, 1.8 / scale);

  const button = (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      onClick={toggle}
      style={{
        boxSizing: "content-box",
        borderWidth: `${bw}px`,
        ...(scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: "top left" } : {}),
      }}
      className={`relative h-[53px] w-[113px] shrink-0 rounded-[39px] border-[#2d61fd] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d61fd] ${
        isOn ? "bg-[#5679ff]" : "bg-[#e7ecff]"
      } ${className}`}
    >
      <span
        className="absolute left-[14.3px] top-1/2 block h-[39.4px] w-[34.6px] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: isOn ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(53.9px)" }}
      >
        <svg viewBox="0 0 34 38" fill="none" preserveAspectRatio="none" overflow="visible" className="block h-full w-full" aria-hidden="true">
          <path
            d="M29.4336 18.5919C29.2848 18.4636 29.1361 18.3354 28.98 18.2108C28.8821 18.1339 28.7841 18.0569 28.6862 17.98C28.4794 17.8224 28.2617 17.6685 28.0404 17.5183C27.7356 17.3095 27.4236 17.1116 27.0971 16.9247L26.4948 6.24041C26.3243 3.1846 23.6213 0.843287 20.4649 1.00817C17.41 1.16572 15.0481 3.6133 15.0481 6.52987C15.0481 6.63612 15.0481 6.73872 15.0553 6.84131L15.4399 13.6527L15.5959 14.4112C15.556 14.4112 15.5197 14.4112 15.4798 14.4149L15.4399 13.6527L14.0721 6.9952C13.459 3.99436 10.444 2.04509 7.33832 2.63866C4.60998 3.16262 2.71973 5.47829 2.71973 8.0651C2.71973 8.42417 2.75601 8.78691 2.8322 9.14965L4.74059 18.4416C4.59547 18.5662 4.45397 18.6908 4.31247 18.819C4.18549 18.9326 4.06576 19.0499 3.94604 19.1744C2.15737 20.9698 1.07982 23.1536 1.00363 25.5096C1 25.5718 1 25.6378 1 25.7001C1 25.799 1 25.8943 1.00363 25.9932C1.11248 28.9867 2.86848 31.6871 5.65488 33.6694C7.56327 35.0214 9.9542 36.0363 12.6281 36.5713C14.0213 36.8497 15.4871 37 17.0036 37C25.7002 37 32.7787 32.0975 33 25.9932C33 25.8943 33 25.799 33 25.7001C32.9746 23.007 31.6431 20.5375 29.4336 18.5919Z"
            fill="white"
          />
          <path
            d="M29.4372 18.5919H29.4336M29.4336 18.5919C29.2848 18.4636 29.1361 18.3354 28.98 18.2108C28.8821 18.1339 28.7841 18.0569 28.6862 17.98C28.4794 17.8224 28.2617 17.6685 28.0404 17.5183C27.7356 17.3095 27.4236 17.1116 27.0971 16.9247L26.4948 6.24041C26.3243 3.1846 23.6213 0.843287 20.4649 1.00817C17.41 1.16572 15.0481 3.6133 15.0481 6.52987C15.0481 6.63612 15.0481 6.73872 15.0553 6.84131L15.4399 13.6527M29.4336 18.5919C31.6431 20.5375 32.9746 23.007 33 25.7001C33 25.799 33 25.8943 33 25.9932C32.7787 32.0975 25.7002 37 17.0036 37C15.4871 37 14.0213 36.8497 12.6281 36.5713C9.9542 36.0363 7.56327 35.0214 5.65488 33.6694C2.86848 31.6871 1.11248 28.9867 1.00363 25.9932C1 25.8943 1 25.799 1 25.7001C1 25.6378 1 25.5718 1.00363 25.5096C1.07982 23.1536 2.15737 20.9698 3.94604 19.1744C4.06576 19.0499 4.18549 18.9326 4.31247 18.819C4.45397 18.6908 4.59547 18.5662 4.74059 18.4416L2.8322 9.14965C2.75601 8.78691 2.71973 8.42417 2.71973 8.0651C2.71973 5.47829 4.60998 3.16262 7.33832 2.63866C10.444 2.04509 13.459 3.99436 14.0721 6.9952L15.4399 13.6527M15.4399 13.6527L15.5959 14.4112C15.556 14.4112 15.5197 14.4112 15.4798 14.4149L15.4399 13.6527Z"
            stroke="#2D61FD"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M13.9995 30C13.4449 30 13 29.1071 13 28.003C13 26.8989 13.4449 26 13.9995 26C14.5542 26 14.9933 26.8989 14.9933 28.003C14.9933 29.1071 14.5484 30 13.9995 30ZM24.0005 30C23.4516 30 23.0067 29.1071 23.0067 28.003C23.0067 26.8989 23.4516 26 24.0005 26C24.5493 26 25 26.8989 25 28.003C25 29.1071 24.5551 30 24.0005 30Z"
            fill="#2D61FD"
          />
        </svg>
      </span>
    </button>
  );

  if (scale === 1) return button;
  return (
    <span className="inline-block align-middle" style={{ width: (113 + 2 * bw) * scale, height: (53 + 2 * bw) * scale }}>
      {button}
    </span>
  );
}
