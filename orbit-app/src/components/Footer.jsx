import React, { useState } from 'react';
import GradientButton from './common/GradientButton';
import AuthDebugger from './AuthDebugger';

const Footer = () => {
  const [showAuthDebugger, setShowAuthDebugger] = useState(
    false
  );
  return (
    <footer className="p-6">
      <div className="ml-2">
        <GradientButton
          text="Auth Debugger"
          onClick={() =>
            setShowAuthDebugger(!showAuthDebugger)
          }
        />
      </div>
      <div className="mt-4">
        {showAuthDebugger && <AuthDebugger />}
      </div>
    </footer>
  );
};

export default Footer;
