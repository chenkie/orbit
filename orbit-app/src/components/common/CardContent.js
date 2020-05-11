import React from 'react';

const CardContent = ({ title, body }) => (
  <>
    <p className="font-bold text-gray-800 text-lg mb-3">{title}</p>
    <p className="text-gray-700 text-sm">{body}</p>
  </>
);

export default CardContent;
