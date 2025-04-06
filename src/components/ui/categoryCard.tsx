"use client";

import { Card } from "@/components/ui/card";
import { CategoryCardProps } from "@/types/CategoryCardProps";
import Link from "next/link";
import React from "react";

function CategoryCard({
  icon,
  title,
  url,
  count,
  bgColor = "bg-blue-50",
  textColor = "text-gray-900",
}: CategoryCardProps) {
  return (
    <Link href={url}>
      <Card
        className={`p-6 flex items-start gap-4 ${bgColor} border-none shadow-sm hover:shadow-lg cursor-pointer`}
      >
        <div className="p-3 rounded-lg bg-white shadow-sm">{icon}</div>
        <div>
          <h3 className={`font-semibold text-lg ${textColor}`}>{title}</h3>
          <p className={`${textColor} opacity-80 text-sm`}>{count}</p>
        </div>
      </Card>
    </Link>
  );
}

export default CategoryCard;
