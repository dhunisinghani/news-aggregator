import { useSelector } from "react-redux";
import { Container, Header, card } from "./index";
import { Col, Row } from "react-bootstrap";
import { header, capitaLize } from "../../config/config";
import { NewsCard } from "../index";
import Loading from "../Loading/Loading";
import "./News.css";
import NoDataFound from "../NoDataFound/NoDataFound";

function News({ handleShowSidebar }) {
  
  let { articles, status, filters } = useSelector((state) => state.articles);

  const heading = (filters.query) ? filters.query : filters.category;

  const openOptions = () => {
    handleShowSidebar();
  };
  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div>
          <Header>{header(capitaLize(heading))}</Header>
          {articles?.length < 1 ? (
            <NoDataFound />
          ) : (
            <Container>
              <Row>
                {articles.map((element, index) => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                      <NewsCard
                        title={element.title}
                        description={element.description}
                        published={element.publishedAt}
                        channel={element.source}
                        alt="News image"
                        publishedAt={element.publishedAt}
                        imageUrl={element.imgSrc}
                        urlNews={element.url}
                        author={element.author}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      )}
    </>
  );
}

export default News;
