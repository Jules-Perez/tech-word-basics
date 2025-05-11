import { ImageSourcePropType } from "react-native";

type choices = {
  name: string;
  isCorrect?: boolean;
};

export enum gameTypeEnum {
  GuessTheImage = "Guess The Image",
  TureOrFalse = "True Or False",
}

export interface INameThatThingLevel {
  gameType: gameTypeEnum;
  levelImg?: ImageSourcePropType; //if Img does not exist, show question instead.
  question?: string;
  description?: string;
  choices: choices[];
}

export const gameLevels: INameThatThingLevel[][] = [
  // HARDWARE
  [
    {
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${4}.png`),
      description:
        "A flash drive is a data storage device that includes flash memory with an integrated USB interface. A typical USB drive is removable, rewritable, and smaller than an optical disc, and usually weighs less than 30 g (1 oz).",
      choices: [
        { name: "FLASH DRIVE", isCorrect: true },
        { name: "USB" },
        { name: "MEMORY CARD" },
        { name: "SIM CARD" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
    {
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
      gameType: gameTypeEnum.GuessTheImage,
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
  // SOFTWARE
  [
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${16}.png`),
      description:
        "Microsoft Excel is a versatile spreadsheet software developed by Microsoft, used globally for organizing data and performing financial analysis.",
      choices: [
        { name: "Microsoft Excel", isCorrect: true },
        { name: "Microsoft word" },
        { name: "Microsoft Lens" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${17}.png`),
      description:
        "Photoshop is an image creation, graphic design and photo editing software developed by Adobe.",
      choices: [
        { name: "Photoshop", isCorrect: true },
        { name: "Photo Pea" },
        { name: "Canva" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${18}.png`),
      description:
        "MS PowerPoint is a program that is covered in the Microsoft Office suite and is bundled unitedly with Word, Excel, and other office productivity tools. Microsoft PowerPoint is a powerful slide show presentation program.",
      choices: [
        { name: "MS PowerPoint", isCorrect: true },
        { name: "Microsoft word" },
        { name: "Microsoft Lens" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${19}.png`),
      description:
        "Chrome browser is a free web browser used for accessing the internet and running web-based applications.",
      choices: [
        { name: "Chrome browser", isCorrect: true },
        { name: "Google" },
        { name: "Microsoft Bing" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${20}.png`),
      description:
        "Skype is software that enables the world's conversations. Millions of individuals and businesses use Skype to make free video and voice one-to-one and group calls , send instant messages and share files with other people on Skype.",
      choices: [
        { name: "Skype", isCorrect: true },
        { name: "Viber" },
        { name: "Wechat" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${21}.png`),
      description:
        "MacOS is the operating system that powers every Mac. It lets you do things you simply can't with other computers. That's because it's designed specifically for the hardware it runs on — and vice versa.",
      choices: [
        { name: "MacOS", isCorrect: true },
        { name: "Linux" },
        { name: "Boot" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${22}.png`),
      description:
        "Linux is an open source operating system that is made up of the kernel, the base component of the OS, and the tools, apps, and services bundled along with it.",
      choices: [
        { name: "Linux", isCorrect: true },
        { name: "Reddit" },
        { name: "DuckDuck Go" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${23}.png`),
      description:
        "Adobe Acrobat Reader software is the free, trusted global standard for viewing, printing, signing, sharing, and annotating PDFs",
      choices: [
        { name: "Adobe Acrobat Reader", isCorrect: true },
        { name: "WPS office." },
        { name: "Microsoft word" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${24}.png`),
      description:
        "Windows Defender is a technology that provides real-time protection against malware, spyware, and other malicious software targeting the operating system.",
      choices: [
        { name: "Windows Defender", isCorrect: true },
        { name: "Microsoft Windows" },
        { name: "Spreed sheet" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${25}.jpg`),
      description:
        "Windows 10 - A popular operating system for personal computers, known for its user-friendly interface.",
      choices: [
        { name: "Windows 10", isCorrect: true },
        { name: "Media Player" },
        { name: "Microsoft" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${26}.jpg`),
      description:
        "Ubuntu - A popular Linux distribution known for its user-friendliness and wide range of software support.",
      choices: [
        { name: "Ubuntu", isCorrect: true },
        { name: "Safari" },
        { name: "Canva" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${27}.png`),
      description:
        "Unix - A foundational operating system that has influenced many modern systems, including Linux and Mac OSZ",
      choices: [
        { name: "Unix", isCorrect: true },
        { name: "Opera" },
        { name: "Canva" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${28}.png`),
      description:
        "Android - A mobile operating system used by many smartphones and tablets known for its open source nature and customization options.",
      choices: [
        { name: "Android", isCorrect: true },
        { name: "Robot" },
        { name: "IOS" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${29}.png`),
      description:
        "IOS - The operating system for apple ‘s iphones  and ipads, known for its smooth performance and tight integration with Apple’s services.",
      choices: [
        { name: "IOS", isCorrect: true },
        { name: "Android" },
        { name: "Orange" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${30}.png`),
      description:
        "Mozilla Firefox - A reliable and customizable web browser known for its privacy features and support for add-ons.",
      choices: [
        { name: "Mozilla Firefox", isCorrect: true },
        { name: "Opera" },
        { name: "Eclipse IDE" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${31}.jpg`),
      description:
        "Microsoft Edge - The defaullt web browser for Windows known for its integration with microsoft services and performance improvements.",
      choices: [
        { name: "Microsoft Edge", isCorrect: true },
        { name: "Unix" },
        { name: "Ubuntu" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${32}.png`),
      description:
        "Safari - The default web browser for apple devices known for its speed and integration with apple’s ecosystem.",
      choices: [
        { name: "Safari", isCorrect: true },
        { name: "PyCharm" },
        { name: "Unity" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${33}.png`),
      description:
        "Opera - A fast and feature rich web browser known for its built-in VPN and ad blocker.",
      choices: [
        { name: "Opera", isCorrect: true },
        { name: "NetBeans" },
        { name: "Unity" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${34}.png`),
      description:
        "Windows Media Player - The default media player for Windows, capable of playing various audio and video formats.",
      choices: [
        { name: "Windows Media Player", isCorrect: true },
        { name: "One Drive" },
        { name: "Unity Engine" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${35}.png`),
      description:
        "VLC Media Player - A versatile media player that can play almost any audio or video format, known for its open source nature and cross-platform compatibility.",
      choices: [
        { name: "VLC Media Player", isCorrect: true },
        { name: "Dropbox" },
        { name: "Win Zip" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${36}.png`),
      description:
        "XCode - The official IDE for developing applications for Apple’s iOs, macOS, and watchOS platfoms.",
      choices: [
        { name: "XCode", isCorrect: true },
        { name: "Blender" },
        { name: "Canva" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${37}.png`),
      description:
        "Android Studio - The official IDE for developing Android applications, providing tools for building, testing, and deploying apps.",
      choices: [
        { name: "Android Studio", isCorrect: true },
        { name: "GitHub" },
        { name: "Xcode" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${38}.png`),
      description:
        "Unity - A game engine used for creating 2D and 3D games, known for its ease of use and powerful features.",
      choices: [
        { name: "Unity", isCorrect: true },
        { name: "MySQL" },
        { name: "PyCharm" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${39}.png`),
      description:
        "Adobe Photoshop - A powerful image editing software used by professionals and enthusiasts alike for photo manipulation, graphic design.",
      choices: [
        { name: "Adobe Photoshop", isCorrect: true },
        { name: "Eclipse IDE" },
        { name: "PyCharm" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${40}.png`),
      description:
        "Canva - A user-friendly graphic design platform that offers templates and tools for creating visual content.",
      choices: [
        { name: "Canva", isCorrect: true },
        { name: "NetBeans" },
        { name: "Ubuntu" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${41}.png`),
      description:
        "Blender - A free and open-source 3D creation software used for animation, modeling, and rendering.",
      choices: [
        { name: "Blender", isCorrect: true },
        { name: "Unity" },
        { name: "C++" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${42}.png`),
      description:
        "Adobe Premiere Pro - A professional video editing software used for creating high-quality videos for film, television, and web.",
      choices: [
        { name: "Adobe Premiere Pro", isCorrect: true },
        { name: "Unix" },
        { name: "Ubuntu" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${43}.png`),
      description:
        "Visual Studio Code - A popular code editor known for its extensibility, debugging features, and support for various programming languages.",
      choices: [
        { name: "Visual Studio Code", isCorrect: true },
        { name: "PyCharm" },
        { name: "C++" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${44}.png`),
      description:
        "JetBrain IntelliJ IDEA - A powerful integrated development environment (IDE) primary used for Java development.",
      choices: [
        { name: "JetBrain IntelliJ IDEA", isCorrect: true },
        { name: "NetBeans" },
        { name: "Unity" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${45}.png`),
      description:
        "Eclipse IDE - A widely used IDE that supports multiple programming languages, including Java, C++, and Python.",
      choices: [
        { name: "Eclipse IDE", isCorrect: true },
        { name: "Oracle Database" },
        { name: "Cisco Packet Tracer" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${46}.png`),
      description:
        "NetBeans - Another popular IDE that supports various programming languages including Java , C++, and PHP.",
      choices: [
        { name: "NetBeans", isCorrect: true },
        { name: "Mango DB" },
        { name: "PuTTy" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${47}.png`),
      description:
        "PyCharm - An IDE specifically designed for Python development known for its code completion, debugging, and refactoring features.",
      choices: [
        { name: "PyCharm", isCorrect: true },
        { name: "SQLite" },
        { name: "Open VPN" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${48}.png`),
      description:
        "GitHub - A platform for hosting and managing Git repositories, enabling collaboration on software projects.",
      choices: [
        { name: "GitHub", isCorrect: true },
        { name: "Android Studio" },
        { name: "SQLite" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${49}.png`),
      description:
        "MySOL - A popular open-source relational database management system (RDBMS) widely used for web applications.",
      choices: [
        { name: "MySOL", isCorrect: true },
        { name: "GitHub" },
        { name: "Firebase" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${50}.png`),
      description:
        "PostgreSQL - Another popular, open-source RDBMS known for its reliability, data integrity, and advanced features.",
      choices: [
        { name: "PostgreSQL", isCorrect: true },
        { name: "Canva" },
        { name: "Sophos" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${51}.png`),
      description:
        "Firebase - A platform that provides cloud-based services for mobile and web app development, including a real-time database.",
      choices: [
        { name: "Firebase", isCorrect: true },
        { name: "GitHub" },
        { name: "Android Studio" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${52}.png`),
      description:
        "Windows Defender - The built-in antivirus software for Windows, providing basic protection against malware.",
      choices: [
        { name: "Windows Defender", isCorrect: true },
        { name: "MySOL" },
        { name: "GitHub" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${53}.png`),
      description:
        "Sophos - A commercial antivirus and endpoint security software known for its comprehensive protection and management features.",
      choices: [
        { name: "Sophos", isCorrect: true },
        { name: "Postgre SQL" },
        { name: "Canva" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${54}.png`),
      description:
        "Cisco Packet Tracer - A network simulation software used for learning and experimenting with network configurations.",
      choices: [
        { name: "Cisco Packet Tracer", isCorrect: true },
        { name: "Android Studio" },
        { name: "SQLite" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${55}.png`),
      description:
        "PuTTy - An open-source SSH and telnet client used for connecting to remote servers.",
      choices: [
        { name: "PuTTy", isCorrect: true },
        { name: "GitHub" },
        { name: "Firebase" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${56}.png`),
      description:
        "Open VPN - A popular open-source VPN client used for encrypting internet traffic and protecting privacy.",
      choices: [
        { name: "Open VPN", isCorrect: true },
        { name: "Canva" },
        { name: "Sophos" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${57}.png`),
      description:
        "Dropbox - A cloud storage service that allows users to store and sync files across multiple devices.",
      choices: [
        { name: "Dropbox", isCorrect: true },
        { name: "RARWin Zip" },
        { name: "Cisco Packet Tracer" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${58}.png`),
      description:
        "One Drive - A cloud storage service that allows users to store and sync files across multiple devices.",
      choices: [
        { name: "One Drive", isCorrect: true },
        { name: "Unity Engine" },
        { name: "PuTTy" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${59}.png`),
      description:
        "WinRAR - A popular file archiver used for compressing and extracting files.",
      choices: [
        { name: "WinRAR", isCorrect: true },
        { name: "Xbox App" },
        { name: "Open VPN" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${60}.png`),
      description:
        "Oracle Database - A commercial RDBMS known for its scalability, performance, and security features.",
      choices: [
        { name: "Oracle Database", isCorrect: true },
        { name: "Cisco Packet Tracer" },
        { name: "Team Viewer" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${61}.png`),
      description:
        "Mango DB - A popular NoSQL database known for its scalability, flexibility, and ease of use.",
      choices: [
        { name: "Mango DB", isCorrect: true },
        { name: "PuTTy" },
        { name: "Any Desk" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${62}.png`),
      description:
        "SQLite - A lightweight, embedded database often used in mobile apps and other applications where a full-fledged database is not required.",
      choices: [
        { name: "SQLite", isCorrect: true },
        { name: "Open VPN" },
        { name: "Zoom" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${63}.png`),
      description:
        "Microsoft Teams - A lightweight, embedded database often used in mobile apps and other applications where a full-fledged database is not required.",
      choices: [
        { name: "Microsoft Teams", isCorrect: true },
        { name: "Play Station App" },
        { name: "Dropbox" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${64}.png`),
      description:
        "Skype - A popular video and voice calling application that allows users to connect with others around the world.",
      choices: [
        { name: "Skype", isCorrect: true },
        { name: "Tensor Flow" },
        { name: "One Drive" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${65}.png`),
      description:
        "Google Meet - A video conferencing platform offered by Google, allowing users to host online meetings and webinars.",
      choices: [
        { name: "Google Meet", isCorrect: true },
        { name: "PyTorch" },
        { name: "Win RAR" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${66}.png`),
      description:
        "Team Viewer - A remote access software used for controlling computers remotely.",
      choices: [
        { name: "Team Viewer", isCorrect: true },
        { name: "Play Station App" },
        { name: "Win Zip" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${67}.png`),
      description:
        "AnyDesk - A popular remote access software known for its speed and security.",
      choices: [
        { name: "AnyDesk", isCorrect: true },
        { name: "Tensor Flow" },
        { name: "Unity Engine" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${68}.png`),
      description:
        "Zoom - A video conferencing platform that allows users to host online meetings and webinars.",
      choices: [
        { name: "Zoom", isCorrect: true },
        { name: "PyTorch" },
        { name: "Xbox App" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${69}.png`),
      description:
        "Win Zip - A file archiver similar to WinRAR, known for its compression and encryption features.",
      choices: [
        { name: "Win Zip", isCorrect: true },
        { name: "Play Station App" },
        { name: "Tensor Flow" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${70}.png`),
      description:
        "Unity Engine - A game engine used for developing 2D and 3D games, known for its ease of use and powerful features.",
      choices: [
        { name: "Unity Engine", isCorrect: true },
        { name: "Tensor Flow" },
        { name: "Xbox App" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${71}.png`),
      description:
        "Xbox App - An app for Windows that allows users to play Xbox games on their computers.",
      choices: [
        { name: "Xbox App", isCorrect: true },
        { name: "PyTorch" },
        { name: "Play Station App" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${72}.png`),
      description:
        "Play Station App - An app for mobile devices that allows users to manage their PlayStation accounts, download games, and connect with friends.",
      choices: [
        { name: "Play Station App", isCorrect: true },
        { name: "Dropbox" },
        { name: "Microsoft Teams" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${73}.png`),
      description:
        "Tensor Flow - An open-source machine learning framework developed by Google, widely used for building and deploying machine learning models.",
      choices: [
        { name: "Tensor Flow", isCorrect: true },
        { name: "One Drive" },
        { name: "SkyPe" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${74}.png`),
      description:
        "PyTorch - Another popular open-source machine learning framework known for its flexibility and research-oriented features.",
      choices: [
        { name: "PyTorch", isCorrect: true },
        { name: "WinRAR" },
        { name: "Google Meet" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${75}.png`),
      description:
        "Google Colab - A cloud-based Jupyter notebook environment that provides access to GPUs and TPUs for machine learning tasks.",
      choices: [
        { name: "Google Colab", isCorrect: true },
        { name: "Dropbox" },
        { name: "Google Meet" },
      ],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Computer Software serves as the backbone of all digital devices and systems.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "Development of early computers ENIAC and EDSAC in 1940s.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "High-level Languages like Fortan and Cobol develop in !950s.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "Mobile apps and artificial Intelligence was develop in 2010s.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "System Software designed to perform specific tasks for end-users such as web browsing, gaming, word processing, etc.",
      description:
        "System software manages hardware and basic system operations and serves as a foundation for application software. It serves as a bridge between hardware and use r and ensures that the system operates efficiently and effectively. This includes Operating Systems, Device Drivers, and Utility Software.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Development Software manages hardware and basic system operations and serves as a foundation for application software.",
      description:
        "Development Software includes tools and environments that are used by developers and programmers to create, debug, and maintain software applications. This includes IntegerateDevelopmentnt Environments (Eclipse, Microsoft Visual Studio), Code Editors (Atom, Visual Studio Code), and Version Control Software (Git, GitHub).",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Embedded software is computer software that is designed to operate hardware and perform specific tasks within a larger system. It is optimized for particular functions and integrated into the hardware it controls.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Business Software refers to the applications that assist organizations in managing their operations, improving productivity, and facilitating various business activities",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
  ],
  //NETWORK
  [
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${76}.jpg`),
      description:
        "Dynamic Host Configuration Protocol is a network protocol used to automate the process of assigning IP addresses and other network configuration parameters to devices (such as computers, smartphones, and printers) on a network.",
      choices: [
        { name: "IP Address", isCorrect: true },
        { name: "MAC Address" },
        { name: "Subnet Mask" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${77}.jpg`),
      description:
        "Dynamic Host Configuration Protocol is a network protocol used to automate the process of assigning IP addresses and other network configuration parameters to devices (such as computers, smartphones, and printers) on a network.",
      choices: [
        { name: "DHCP", isCorrect: true },
        { name: "DNS" },
        { name: "VPN" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${78}.png`),
      description:
        "Wide Area Network network that covers a broad area, connecting devices across cities, countries, or even continents. ",
      choices: [
        { name: "WAN", isCorrect: true },
        { name: "LAN" },
        { name: "MAN" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${79}.png`),
      description:
        "Metropolitan Area Network a network that spans a city or campus, larger than a LAN but smaller than a WAN.",
      choices: [
        { name: "MAN", isCorrect: true },
        { name: "WAN" },
        { name: "LAN" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${81}.jpg`),
      description:
        'A MAC address is a hardware identification number that uniquely identifies each device on a network. Every network interface card, such as an Ethernet card or a Wi-Fi adapter, has a permanent MAC address assigned by its manufacturer some operating systems allow an adapter\'s MAC address to be temporarily changed, or "spoofed," in software.',
      choices: [
        { name: "MAC Address", isCorrect: true },
        { name: "IP Address" },
        { name: "Subnet Mask" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${82}.png`),
      description:
        "A subnet mask is a 32-bit number that separates an IP address into two parts: the network ID and the host ID. It tells devices which portion of the address belongs to the network and which identifies individual devices. By doing this it helps to determine which devices belong to the same local network and which devices reside on different networks.",
      choices: [
        { name: "Subnet Mask", isCorrect: true },
        { name: "MAC Address" },
        { name: "IP Address" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${83}.png`),
      description:
        "Devices are connected in a circular formation. Data travels in one direction, reducing the chance of collisions.",
      choices: [
        { name: "Ring Topology", isCorrect: true },
        { name: "Star Topology" },
        { name: "Bus Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${84}.png`),
      description:
        "Every device is connected to every other device. Highly reliable but expensive.",
      choices: [
        { name: "Mesh Topology", isCorrect: true },
        { name: "Star Topology" },
        { name: "Bus Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${85}.png`),
      description:
        "Combines two or more different topologies for flexibility and efficiency.",
      choices: [
        { name: "Hybrid Topology", isCorrect: true },
        { name: "Tree Topology" },
        { name: "Ring Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${86}.png`),
      description:
        "A hierarchical topology where nodes are connected in a parentchild relationship, resembling a tree structure. It combines elements of both star and bus topologies.",
      choices: [
        { name: "Tree Topology", isCorrect: true },
        { name: "Hybrid Topology" },
        { name: "Ring Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${87}.png`),
      description:
        "Devices connect to a central hub. Reliable but depends on the central hub.",
      choices: [
        { name: "Star Topology", isCorrect: true },
        { name: "Ring Topology" },
        { name: "Mesh Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${88}.png`),
      description:
        "All devices share a single communication line or bus. Easy to install but prone to collisions.",
      choices: [
        { name: "Bus Topology", isCorrect: true },
        { name: "Ring Topology" },
        { name: "Mesh Topology" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${89}.png`),
      description:
        "A router is a network device that connects different networks, directing data packets between them. It operates at the network layer of the OSI model.",
      choices: [
        { name: "Routers", isCorrect: true },
        { name: "VPN" },
        { name: "WIFI" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${90}.png`),
      description:
        "A switch is a network device that connects devices within the same network, allowing them to communicate directly. It operates at the data link layer of the OSI model.",
      choices: [
        { name: "Switches", isCorrect: true },
        { name: "Routers" },
        { name: "Firewalls" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${91}.png`),
      description:
        "A firewall is a network security device that monitors and controls incoming and outgoing network traffic, based on predetermined security rules.",
      choices: [
        { name: "Firewalls", isCorrect: true },
        { name: "Hubs" },
        { name: "Routers" },
      ],
    },
    {
      gameType: gameTypeEnum.GuessTheImage,
      levelImg: require(`@/assets/images/ntt-${92}.png`),
      description:
        "A hub is a basic networking device that connects multiple devices in a LAN, broadcasting data to all connected devices. It operates at the physical layer of the OSI model.",
      choices: [
        { name: "Hubs", isCorrect: true },
        { name: "Routers" },
        { name: "Firewalls" },
      ],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Modems: Convert digital data from a computer into a form suitable for transmission over telephone or cable lines.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Access Points: Facilitate wireless communication, allowing devices to connect to a wired network using Wi-Fi.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "TCP Socket (Transmission Control Protocol) Focuses on speed over reliability.",
      description:
        "Used for applications that require error-free data transmission, like web pages or email.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Bridge: Connects two or more network segments and operates at the data link layer, reducing overall network traffic.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Repeater: Extends the range of a network by amplifying and retransmitting signals.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Healthcare: Hospitals use networks to manage patient records, connect medical devices, and enable telemedicine.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Socket Creation The server socket is bound to an IP address and port, allowing it to receive ",
      description:
        "The server creates a socket that listens for incoming client connections. ",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Smartest Device: Routers are typically considered the smartest among the three. They make intelligent decisions about the best paths for data, ensuring efficient and secure communication between networks.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Intermediate Device: Switches are intermediate devices, facilitating efficient communication within a single network but without the decision-making complexity of routers.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Basic Device: Hubs are considered the most basic among the mentioned devices, broadcasting data without the ability to make intelligent forwarding decisions.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Corporate Networks: Used by businesses to connect employees, share resources, and communicate internally and externally.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "UDP Socket (User Datagram Protocol) Used for applications that require error-free data transmission, like web pages or email.",
      description:
        "Commonly used in applications where occasional data loss is acceptablesuch as live streaming or online gaming.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Network Interface Cards (NIC): Hardware that allows a computer to connect to a network.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Education: Schools and universities use networks to facilitate online learning, resource sharing, and communication. ",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "Binding A client connects to the server’s IP and port.",
      description:
        "The server socket is bound to an IP address and port, allowing it to receive data.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "Connection-Data is transmitted between the client and server.",
      description: "A client connects to the server’s IP and port.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
  ],
  //CYBERSEC
  [
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Cybersecurity is the act of protecting computer systems, networks program, and data from digital attacks, unauthorized access, damage or theft.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "CIA stands for Confidentiality information address.",
      description:
        "CIA stands for Confidentiality, Integrity, and Availability.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Phishing is the fraudulent practice of sending spam emails by impersonating legitimate sources.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Social engineering attacks can take many forms and can be carried out anywhere human collaboration is required.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "VPN stands for Virtual Process Network.",
      description: "VPN stands for Virtual Private Network.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question: "ARP stands for Address Restart Protocol.",
      description:
        "Address Resolution Protocol (ARP) is a protocol for mapping an Internet Protocol address (IP address) to a physical machine address that is recognized in the local network.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Ransomware is documented encryption programing that uses special cryptographic calculations to encrypt records in a targeted framework.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Cryptocurrency Hijacking as a digital currencies and mining become more popular so do cybercriminals. They have found an evil advantage in crytocurrency mining, which involves complex calculations to mine virtual currencies such as Bitcoin, Ethereum, Monero, and Litecoin.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Bonet attacks often target large organization and entities that obtain vast amounts of information. This attack allows programmers to control countless devices for cunning intent.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Application security is the most important core component of cyber security, adding security highlights to applications during the improvement period to defend against cyber attacks.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Physical Layer handles the movement of data to and from the physical link. It is also responsible for encoding and decoding of data bits.",
      description:
        "Physical Layer: Responsible for transmission of digital data from sender to receiver through the communication media.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Information security is a component of cyber security that describes how information is protect agaist unauthorized access, use, disclosure, disruption, alteration, or deletion.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Network security is the security provided to a network from unauthorized access and threats. It is the network administrator’s reponsibility to take precautions to protect the network from potential security threats. Network security is another element of IT security. The method of defending and preventing unauthorized access to computer networks.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Confidentiality maintaining of Hardware, upgrading regularly Data Backups and Recovery, Network Bottlenecks should be taken care of.",
      description:
        "Confidentiality the information should be accessible and readable only to authorized personnel. It should not be accessible by unauthorized personnel. The information should be strongly encrypted just in case someone uses hacking to access the data so that even if the data is accessed, it is not readable or understandable.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Disaster Recovery Planning a plan that describes the continuity of work after a disaster quickly and efficiently is known as a disaster recovery plan at the business level and identify applications that are generally critical to carrying out the association’s activities.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Operational Security in order to protect sensitive data from a variety of threats, the process of allowing administrators to see activity from a hackers perpective is called operational security(OPSEC) or procedural security.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "End User Education is the most important component of computer security.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "The Domain Name System (DNS) translates domain names into IP addressesthat browsers use to load web pages.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Availability Integrity ensures that data is not corrupted or modified by unauthorized personnel. If an authorized individual/system is trying to modify the data and the modification wasn’t successful. Then the data should be reversed back and should not be corrupted.",
      description:
        "Availability The data should be available to the user whenever the user requires it. Maintaining of Hardware, upgrading regularly, Data Backups and Recovery, Network Bottlenecks should be taken care of.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "A firewall is a hardware or software-based network security devices that monitors all incoming and outgoing traffic and accepts, denies, or drop that particular traffic based on a defined set of security rules.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "VPN stands for Virtual Private Network that creates a secure, encrypted connection over an insecure network like the internet.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Integrity the data should be available to the user whenever the user requires it.",
      description:
        "Integrity ensures that data is not corrupted or modified by unauthorized personnel. If an authorized individual/system is trying to modify the data and the modification wasn’t successful, then the data should be reversed back and should not be corrupted.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "A worm is basically a type of malicious malware that spreads rapidly from one computer to another via email and file sharing.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Transport layer responsible for packet forwarding and providing routing paths for network communication.",
      description:
        "Transport Layer: Responsible for end-to-end communication over the network. It splits the data from the above layer and passes it to the Network Layer and then ensures that all the data has successfully reached at the receiver’s end.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Spyware is basically a type of malicious malware that runs in the background of your computer, steals all your sensitive data and reports this data to remote attackers.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Ransomware is used as malware to extort money from users to ransom by gaining unauthorized access to sensitive user information and demanding payment to delete or return that information from user.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Data Link Layer responsible for transmission od digital data from sender to receiver through the communication media.",
      description:
        "Data Link Layer: Handles the movement of data to and from the physical link. It is also responsible for encoding and decoding of data bits.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "A virus is a type of malicious malware that comes as an attachment with a file or a program.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Trojans are malicious non-replicating malware that often degrades computer performance and efficiency.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Network Layer responsible for end to end communication over the network. It splits the data from the above layer and passes it to the Network Layer and then ensure that all data has successfully reached at the receiver’s end.",
      description:
        "Network Layer: Responsible for packet forwarding and providing routing paths for network communication.",
      choices: [{ name: "TRUE" }, { name: "FALSE", isCorrect: true }],
    },
    {
      gameType: gameTypeEnum.TureOrFalse,
      question:
        "Active attack is a type of attack in which the attecker modifies or attempts to modify the content of the message.",
      choices: [{ name: "TRUE", isCorrect: true }, { name: "FALSE" }],
    },
  ],
];
