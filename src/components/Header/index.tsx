import { Title, IconButton, useTheme } from "@inovaetech/components-react";

export const Header = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const { isDark, changeTheme } = useTheme();

  return (
    <Title title={title}>
      {children}
      <IconButton
        onPress={() => {
          changeTheme(isDark ? "light" : "dark");
        }}
        isRaised
        circle
        color="warning"
        className="h-8 w-8"
        icon={isDark ? "PiMoonFill" : "PiSunFill"}
      />
    </Title>
  );
};
