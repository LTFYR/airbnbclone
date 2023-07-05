"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "../Category";
import Container from "../Container";
import { categories } from "@/app/utils/categories";

export default function Categories() {
  const params = useSearchParams();
  const filteredCategory = params?.get("category");
  const pathname = usePathname();

  const homePage = pathname === "/";

  if (!homePage) {
    return null;
  }
  return (
    <Container>
      <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
        {categories.map((categ) => (
          <Category
            key={categ.label}
            label={categ.label}
            selected={filteredCategory === categ.label}
            icon={categ.icon}
          />
        ))}
      </div>
    </Container>
  );
}
