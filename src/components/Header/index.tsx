import { Title, useTheme, ButtonTheme } from "@inovaetech/components-react";

export const Header = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const { isDark, changeTheme } = useTheme();

  return (
    <Title title={title}>
      {children}
      <ButtonTheme
        onPress={() => {
          changeTheme(isDark ? "light" : "dark");
        }}
        theme={isDark ? "dark" : "light"}
      />
    </Title>
  );
};
