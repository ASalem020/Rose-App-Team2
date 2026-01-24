import React from 'react';

export default function Rating({
  rating,
}: {
  rating: number;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star}>
          {rating >= star ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.303l-4.118 3.527 1.257 5.284c.27 1.134-.964 2.033-1.96 1.425L12 18.354l-4.626 2.835c-.996.608-2.23-.291-1.96-1.425l1.257-5.284-4.118-3.527c-.887-.758-.415-2.21.749-2.303l5.404-.434 2.082-5.006Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111 5.563.475c.475.04.675.593.315.9l-4.24 3.63 1.3 5.475c.11.462-.39.804-.79.556L12 18.354l-4.553 2.793c-.4.248-.9-.094-.79-.556l1.3-5.475-4.24-3.63c-.36-.307-.16-.86.315-.9l5.563-.475 2.125-5.111Z"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
