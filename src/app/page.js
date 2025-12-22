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
    <div className="my-5">
      Hello world!
      <Button>Click me </Button>

      <Card>My name is David</Card>

      <Row>
        <Card className="m-2 p-4">Card 1</Card>
        <Card className="m-2 p-4">Card 2</Card>
        <Card className="m-2 p-4">Card 3</Card>
      </Row>

      <Column>
        <Button className="my-2" backgroundColor="bg-blue-500" color="text-white">
          Blue Button
        </Button>
        <Button className="my-2" backgroundColor="#28a745" color="#fff">
          Green Button
        </Button>
      </Column>

      <BaseInput placeholder="Enter your name" className="my-5"></BaseInput>
      
      <BaseTextArea></BaseTextArea>

      <SearchBar></SearchBar>
    </div>
  );
}
