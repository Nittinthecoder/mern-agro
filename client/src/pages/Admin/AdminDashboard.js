import { Button, ButtonToolbar, FlexboxGrid } from "rsuite";
import { Heading } from "rsuite";

import { Link } from "react-router-dom";

import Layout from "../../components/Layout/Layout";

export default function AdminDashboard() {
  return (
    <Layout className="relative">
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          USER DASHBOARD
        </Heading>
        <FlexboxGrid className="absolute left-[10rem]" justify="space-around">
          <FlexboxGrid.Item>
            <div>
              <ButtonToolbar className="flex flex-col">
                <Button color="green" appearance="ghost">
                  <Link>CREATE CATEGORY</Link>
                </Button>
                <Button color="green" appearance="ghost">
                  <Link>CREATE PRODUCT</Link>
                </Button>
                <Button color="green" appearance="ghost">
                  <Link>VIEW PRODUCTS</Link>
                </Button>
                <Button color="green" appearance="ghost">
                  <Link>ALL USERS</Link>
                </Button>
              </ButtonToolbar>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <div className="absolute top-[36rem] left-3">
              <Button color="cyan" appearance="primary">
                Setting
              </Button>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </Layout>
  );
}
