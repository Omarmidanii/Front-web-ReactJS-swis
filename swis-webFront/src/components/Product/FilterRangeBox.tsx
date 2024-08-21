import { HStack, Input } from "@chakra-ui/react";

interface Props{
    width? : string;
}


const FilterRangeBox = ({width} : Props) => {
  return (
    <HStack w={width}>
    <Input
    type="number"
    min={0}
    onChange={(e) =>{console.log(e.target.value)}}
    placeholder="MinSize"
    >

    </Input>
    <Input
    type="number"
    placeholder="MaxSize"
    onChange={(e) =>{console.log(e.target.value)}}
    >

    </Input>
    </HStack>
  )
}

export default FilterRangeBox