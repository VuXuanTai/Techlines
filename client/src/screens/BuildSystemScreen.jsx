import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from "@chakra-ui/react";

import BuildingTab from "../components/BuildingTab";

const BuildSystemScreen = () => {
  return (
    <Box p="20px" minH="100vh">
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack
          pr={{ base: "0", md: "14" }}
          spacing={{ base: "8", md: "10" }}
          flex="1.5"
          mb={{ base: "12", md: "none" }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Xây Dựng Hệ Thống Nhà Thông Minh Của Bạn
          </Heading>
          <Text>
            Để hệ thống làm việc tốt nhất. Chúng tôi khuyến cáo bạn xây dựng hệ thống theo cùng một hãng Smarthome.
          </Text>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab>Hệ Thống 1</Tab>
              <Tab>Hệ Thống 2</Tab>
              <Tab>Hệ Thống 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BuildingTab />
              </TabPanel>
              <TabPanel>
                <BuildingTab />
              </TabPanel>
              <TabPanel>
                <BuildingTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BuildSystemScreen;
