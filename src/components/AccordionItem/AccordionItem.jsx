/* eslint-disable react/prop-types */
import { useState } from "react";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md mb-2">
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <div className="p-3 border-t">
          <p className="text-gray-800">{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
