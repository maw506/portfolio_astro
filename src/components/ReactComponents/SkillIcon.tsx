import { Tooltip } from "antd";

type Props = {
  name: string;
  icon: string;
};

export default function SkillIcon({ name, icon }: Props) {
  return (
    <Tooltip title={name} placement="top">
      <div className="skill-icon">
        <i className={`devicon-${icon}-plain`} />
      </div>
    </Tooltip>
  );
}
