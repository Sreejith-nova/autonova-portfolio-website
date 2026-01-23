"use client";

import { memo, useMemo, useState, useEffect } from "react";
import { WorkAsset, WorkAssetCard } from "./WorkAssetCard";
import { cn } from "@/components/ui-primitives";

interface MasonryGalleryProps {
    items: WorkAsset[];
    onAssetClick: (asset: WorkAsset) => void;
}

export const MasonryGallery = memo(function MasonryGallery({ items, onAssetClick }: MasonryGalleryProps) {
    const columns = useMediaColumns();

    // Distribute items into columns
    const columnItems = useMemo(() => {
        const cols: WorkAsset[][] = Array.from({ length: columns }, () => []);

        items.forEach((item, index) => {
            cols[index % columns].push(item);
        });

        return cols;
    }, [items, columns]);

    return (
        <div
            className="flex gap-[12px] md:gap-[18px] w-full"
            style={{ alignItems: "flex-start" }}
        >
            {columnItems.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 flex flex-col w-0">
                    {/* w-0 flex-1 ensures equal width columns that shrink properly */}
                    {col.map((item) => (
                        <WorkAssetCard
                            key={item.id}
                            asset={item}
                            onClick={onAssetClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
});

// Hook to determine column count based on window width
function useMediaColumns() {
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1600) setColumns(5);
            else if (width >= 1200) setColumns(4);
            else if (width >= 900) setColumns(3);
            else if (width >= 600) setColumns(2);
            else setColumns(1);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    return columns;
}
