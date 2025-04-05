import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SkillIcon from "./SkillIcon";

const skills = [
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css3" },
  { name: "SCSS", icon: "sass" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Redux", icon: "redux" },
  { name: "Webpack", icon: "webpack" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Firebase", icon: "firebase" },
  { name: "SQL Server", icon: "microsoftsqlserver" },
  { name: "MySQL", icon: "mysql" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
  { name: "Trello", icon: "trello" },
  { name: "Jira", icon: "jira" },
];

export default function SkillsCarousel() {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={24}
      loop={true}
      speed={5000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      freeMode={true}
      grabCursor={true}
      modules={[Autoplay]}
      className="skills-swiper"
    >
      {skills.map((skill, index) => (
        <SwiperSlide key={index} style={{ width: "auto" }}>
          <SkillIcon name={skill.name} icon={skill.icon} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
