import React from "react";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      <ul className="flex space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <a href={path.href} className="text-blue-600 hover:underline">
              {path.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const PageBreadcrumb = ({ page }) => {
  return (
    <Breadcrumb
      paths={[
        { label: "Home", href: "/" },
        { label: page, href: "#" },
      ]}
    />
  );
};

export default Breadcrumb;
