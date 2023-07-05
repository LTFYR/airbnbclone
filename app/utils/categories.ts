import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach !",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property got windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern and deluxe!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is close to mountains !",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pools !",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on island !",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to lake !",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn !",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is close to mountains !",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is close to desert !",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle !",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is close to cave !",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is close to arctic !",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property contains lux things !",
  },
];
