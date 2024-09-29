'use client';
import { useRouter } from "next/router";
import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {


  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-base-content ">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          Admin/Home
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;