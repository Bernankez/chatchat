import { Icon } from "@iconify/react";

export default function ConversationList() {
  return (
    <>
      <div className="flex item-start gap-3 py-4 px-2 hover:dark:bg-accent/30 hover:bg-accent/60 transition">
        <div>
          <Icon icon="gravity-ui:ghost" color="#18a058" width="2rem"></Icon>
        </div>
        <div className="pr-[2.75rem]">
          <p>
            在GLSL（OpenGL Shading
            Language）中，texture函数用于从纹理中采样颜色值。这个函数会根据提供的坐标参数从指定的纹理图像中获取颜色信息。texture函数有几个不同的变体，它们可以接受不同的参数类型和数量，以适应不同的纹理采样需求。
          </p>
        </div>
      </div>
      <div className="flex item-start flex-row-reverse gap-3 py-4 px-2 hover:dark:bg-accent/30 hover:bg-accent/60 transition">
        <div>
          <Icon icon="gravity-ui:ghost" color="#18a058" flip="horizontal" width="2rem"></Icon>
        </div>
        <div className="pl-[2.75rem]">
          <p>
            在GLSL（OpenGL Shading
            Language）中，texture函数用于从纹理中采样颜色值。这个函数会根据提供的坐标参数从指定的纹理图像中获取颜色信息。texture函数有几个不同的变体，它们可以接受不同的参数类型和数量，以适应不同的纹理采样需求。
          </p>
        </div>
      </div>
    </>
  );
}
