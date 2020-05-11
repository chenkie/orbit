import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  faCaretDown,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './../context/AuthContext';
import defaultAvatar from './../images/defaultAvatar.png';

const DropdownItem = ({ item }) => (
  <button
    className="text-gray-700 flex items-center"
    onClick={item.onClick}
  >
    <FontAwesomeIcon icon={item.icon} />
    <p className="ml-2">{item.title}</p>
  </button>
);

const DropdownContent = ({ dropdownItems }) => {
  return (
    <div className="bg-white w-full absolute p-4 shadow-lg rounded-lg mt-2">
      {dropdownItems.map((item, i) => {
        return (
          <div className="mt-1" key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown = () => {
  const node = useRef();
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      title: 'Log Out',
      icon: faSignOutAlt,
      onClick: auth.logout
    }
  ];

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClick
      );
    };
  }, []);

  return (
    <div ref={node}>
      <button
        ref={node}
        className="flex rounded-full items-center py-2 px-3 bg-gradient focus:outline-none shadow-lg"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={authState.userInfo.avatar || defaultAvatar}
          className="rounded-full w-6 border-2 border-white"
          alt="Avatar"
        />
        <div className="px-3">
          <p className="text-white">
            {authState.userInfo.firstName}
          </p>
        </div>
        <div className="mr-1 text-white">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </button>

      {dropdownOpen && (
        <div className="relative">
          <DropdownContent dropdownItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
