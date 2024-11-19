import { ImageSourcePropType } from "react-native";

type choices = {
  name: string;
  isCorrect?: boolean;
};

export interface INameThatThingLevel {
  levelImg: ImageSourcePropType;
  description?: string;
  choices: choices[];
}

export const gameLevels: INameThatThingLevel[][] = [
  [
    {
      levelImg: require(`@/assets/images/ntt-${0}.png`),
      description:
        "A computer keyboard is a peripheral input device modeled after the typewriter keyboard which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches. Replacing early punched cards and paper tape technology, interaction via teleprinter-style keyboards have been the main input method for computers since the 1970s, supplemented by the computer mouse since the 1980s.",
      choices: [
        {
          name: "KEYBOARD",
          isCorrect: true,
        },
        { name: "IPAD" },
        { name: "SCREEN" },
        { name: "CASE" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${1}.png`),
      description:
        "A computer monitor is an output device that displays information in pictorial or textual form. A discrete monitor comprises a visual display, support electronics, power supply, housing, electrical connectors, and external user controls.",
      choices: [
        { name: "MONITOR", isCorrect: true },
        { name: "TV" },
        { name: "IPAD" },
        { name: "PROJECTOR" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${2}.png`),
      description:
        "A computer mouse (plural mice, also mouses)[nb 1] is a hand-held pointing device that detects two-dimensional motion relative to a surface. This motion is typically translated into the motion of the pointer (called a cursor) on a display, which allows a smooth control of the graphical user interface of a computer.",
      choices: [
        { name: "MOUSE", isCorrect: true },
        { name: "REMOTE" },
        { name: "CONTROLLER" },
        { name: "SWITCH" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${3}.png`),
      description:
        "A desktop computer is a computer that fits on or under a desk. They utilize peripheral devices for interaction, such as a keyboard and mouse for input, and display devices like a monitor, projector, or television. Desktop computers can have a horizontal or vertical (tower) form factor, or be combined with a monitor to create an All-in-One computer.",
      choices: [
        { name: "DESKTOP PC", isCorrect: true },
        { name: "LAPTOP" },
        { name: "MONITOR" },
        { name: "TABLET" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${4}.png`),
      description:
        "A flash drive  is a data storage device that includes flash memory with an integrated USB interface. A typical USB drive is removable, rewritable, and smaller than an optical disc, and usually weighs less than 30 g (1 oz).",
      choices: [
        { name: "FLASH DRIVE", isCorrect: true },
        { name: "USB" },
        { name: "MEMORY CARD" },
        { name: "SIM CARD" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${5}.png`),
      description:
        "A projector or image projector is an optical device that projects an image (or moving images) onto a surface, commonly a projection screen. Most projectors create an image by shining a light through a small transparent lens, but some newer types of projectors can project the image directly, by using lasers. A virtual retinal display, or retinal projector, is a projector that projects an image directly on the retina instead of using an external projection screen.",
      choices: [
        { name: "PROJECTOR", isCorrect: true },
        { name: "PIN LIGHT" },
        { name: "CIRCUIT BULB" },
        { name: "FLASHLIGHT" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${6}.png`),
      description:
        "A printer is an external hardware output device that takes the electronic data stored on a computer or other device and generates a hard copy. For example, if you created a report on your computer, you could print several copies to hand out at a staff meeting.",
      choices: [
        { name: "PRINTER", isCorrect: true },
        { name: "MOTHER BOARD" },
        { name: "PROCESSOR" },
        { name: "MONITOR" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${7}.png`),
      description:
        "A Hard Disk Drive (sometimes abbreviated as a hard drive, HD, or HDD) is a non-volatile data storage device. It is usually installed internally in a computer, attached directly to the disk controller of the computer's motherboard.",
      choices: [
        { name: "HARD DRIVE", isCorrect: true },
        { name: "DVD" },
        { name: "CD" },
        { name: "CPU" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${8}.png`),
      description:
        "A power supply is an electrical device that supplies electric power to an electrical load. The main purpose of a power supply is to convert electric current from a source to the correct voltage, current, and frequency to power the load. As a result, power supplies are sometimes referred to as electric power converters. Some power supplies are separate standalone pieces of equipment, while others are built into the load appliances that they power. ",
      choices: [
        { name: "POWER SUPPLY", isCorrect: true },
        { name: "SPEAKER" },
        { name: "CCTV" },
        { name: "CONNECTOR" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${9}.png`),
      description:
        "A microphone, colloquially called a mic is a transducer that converts sound into an electrical signal. Microphones are used in many applications such as telephones, hearing aids, public address systems for concert halls and public events, motion picture production, live and recorded audio engineering, sound recording, two-way radios, megaphones, and radio and television broadcasting.",
      choices: [
        { name: "MICROPHONE", isCorrect: true },
        { name: "BUS" },
        { name: "SPEAKER" },
        { name: "HEAT SINK" },
      ],
    },
  ],
  [
    {
      levelImg: require(`@/assets/images/ntt-${10}.png`),
      description:
        "A Graphics Processing Unit (GPU) is a specialized electronic circuit in a computer that speeds up the processing of images and videos in a computer system. Initially created for graphics tasks, GPUs have transformed into potent parallel processors with applications extending beyond visual computing.",
      choices: [
        { name: "GPU", isCorrect: true },
        { name: "COMPUTER MEMORY" },
        { name: "ELECTRIC FAN" },
        { name: "CPU" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${11}.png`),
      description:
        "Computer memory stores information, such as data and programs, for immediate use in the computer. The term memory is often synonymous with the terms RAM, main memory, or primary storage. Archaic synonyms for main memory include core (for magnetic core memory) and store.",
      choices: [
        { name: "COMPUTER MEMORY", isCorrect: true },
        { name: "STORAGE" },
        { name: "POWER SUPPLY" },
        { name: "CPU" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${12}.png`),
      description:
        "A scanner is a device that captures images from photographic prints, posters, magazine pages and similar sources for computer editing and display.",
      choices: [
        { name: "FLASH DRIVE" },
        { name: "SCANNER", isCorrect: true },
        { name: "DVD" },
        { name: "PRINTER" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${13}.png`),
      description:
        "A modem and router are two of the most frequent components in a home network configuration. A router establishes a local area network (LAN), whereas a modem connects to an internet service provider (ISP). For a home network to work, both devices are necessary.",
      choices: [
        { name: "MODEM", isCorrect: true },
        { name: "RAM" },
        { name: "MOUSE" },
        { name: "HARD DISK" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${14}.png`),
      description:
        "SSD is a storage device for a computer that keeps hold of all your programs, files, and whatever else you have on your computer, but not all storage is the same. Even the best cheap SSD will give you next-level performance over the best hard drive, while the best SSD overall will provide load times that older PCs could only dream of.",
      choices: [
        { name: "SSD", isCorrect: true },
        { name: "SIM CARD" },
        { name: "USB" },
        { name: "RAM" },
      ],
    },
    {
      levelImg: require(`@/assets/images/ntt-${15}.png`),
      description:
        "A joystick, sometimes called a flight stick, is an input device consisting of a stick that pivots on a base and reports its angle or direction to the device it is controlling. Also known as the control column, it is the principal control device in the cockpit of many civilian and military aircraft, either as a centre stick or side-stick. It has various switches to control functions of the aircraft controlled by the Pilot and First Officer of the flight.",
      choices: [
        { name: "JOYSTICK", isCorrect: true },
        { name: "MICROSCOPE" },
        { name: "CONTROLLER" },
        { name: "MOUSE" },
      ],
    },
  ],
];
