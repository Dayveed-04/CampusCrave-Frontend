import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import { BaseSelect } from "@/components/baseSelect";
import { BaseTextArea } from "@/components/baseTextArea";
import Button from "@/components/button";
import Card from "@/components/card";
import { Column, Row } from "@/components/flex";
import { SearchBar } from "@/components/searchBar";


export default function LandingPage() {
  return (

    <div className="h-screen w-screen flex items-center justify-center">
      <div className="relative text-black font-script">
        <h1 className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]">
          Campus
        </h1>
        <h1 className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] ml-16 mt-2">
          Crave
        </h1>
      </div>  
    </div>
  );
}
