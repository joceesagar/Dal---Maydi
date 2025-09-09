import {
  FlagIcon,
  FlameIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";

export const WellnessEcosystemSection = () => {
  const statsData = [
    {
      value: "100%",
      description: "Pure & Natural Oils",
      icon: FlameIcon,
    },
    {
      value: "50K+",
      description: "Happy Customers",
      icon: UserCheckIcon,
    },
    {
      value: "31M+",
      description: "Message Rotation",
      icon: MessageSquareIcon,
    },
    {
      value: "30+",
      description: "Countries",
      icon: FlagIcon,
    },
  ];

  return (
    <section className="w-full relative border-b border-border/45 pb-16">
      <div className="flex justify-center items-center gap-8 px-4  pt-34 ">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center w-[250px] h-[202px]"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <IconComponent className="w-4 h-4 text-[#1565d8] fill-current " />
              </div>

              <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#183b56] text-5xl text-center tracking-[0.20px] leading-[60px] whitespace-nowrap mb-4">
                {stat.value}
              </div>

              <div className="[font-family:'Poppins',Helvetica] font-normal text-[#5a7184] text-lg tracking-[0] leading-8 text-center">
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
