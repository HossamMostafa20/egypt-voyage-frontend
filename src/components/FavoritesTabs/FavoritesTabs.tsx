"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabValue = "all" | "hotels" | "landmarks" | "restaurants" | "programs";

export default function FavoritesTabs({ value, onChange }: { value: TabValue; onChange: (v: TabValue) => void; }) {
  return <>
    <Tabs value={value} onValueChange={(v) => onChange(v as TabValue)}>
      <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent">

        <TabsTrigger value="all" className="data-[state=active]:bg-[#0D3B66] data-[state=active]:text-white cursor-pointer">
          All
        </TabsTrigger>

        <TabsTrigger value="hotels" className="data-[state=active]:bg-[#0D3B66] data-[state=active]:text-white cursor-pointer">
          Hotels
        </TabsTrigger>

        <TabsTrigger value="landmarks" className="data-[state=active]:bg-[#0D3B66] data-[state=active]:text-white cursor-pointer">
          Landmarks
        </TabsTrigger>

        <TabsTrigger value="restaurants" className="data-[state=active]:bg-[#0D3B66] data-[state=active]:text-white cursor-pointer">
          Restaurants
        </TabsTrigger>

        <TabsTrigger value="programs" className="data-[state=active]:bg-[#0D3B66] data-[state=active]:text-white cursor-pointer">
          Programs
        </TabsTrigger>

      </TabsList>
    </Tabs>
  </>
}
