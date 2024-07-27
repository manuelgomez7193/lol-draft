import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LinkGenerator = () => {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    generateLinks();
  }, []);

  const generateLinks = () => {
    const newLinks = Array.from({ length: 1 }, () => `http://localhost:3000/${uuidv4()}`);
    setLinks(newLinks);
  };

  return links;
};

export default LinkGenerator;
