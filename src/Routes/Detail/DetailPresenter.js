import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: absolute;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  :last-child {
    flex-direction: column;
    padding: 40px 30px;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin-right: 15px;
  }
`;

const Cover = styled.div`
  width: 50%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  padding: 30px 40px;
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemWrap = styled.div`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  :nth-child(2) {
    font-weight: 700;
    margin-top: 5px;
  }
`;
const Item = styled.span`
  img {
    width: 40px;
    margin: 0 10px;
  }
`;
const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 16px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 40px;
`;

const Company = styled.div`
  padding: 10px 0 20px 20px;
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  span {
    font-size: 18px;
  }
`;
const VideoContainer = styled.div`
  iframe {
    padding: 10px;
  }
`;

const SeasonContainer = styled.div`
  display: flex;
  img {
    width: 250px;
    height: 350px;
  }
`;
const SeasonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading || Summflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          || Summflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemWrap>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime
                ? `${result.runtime} min`
                : `${result.episode_run_time[0]} min`}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index + 1 === result.genres.length
                    ? genre.name
                    : `${genre.name} / `,
                )}
            </Item>
            {result.imdb_id && (
              <Item
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  window.open(
                    `https://imdb.com/title/${result.imdb_id}`,
                    '_blank',
                  )
                }
              >
                <img src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" />
              </Item>
            )}
          </ItemWrap>
          <Overview>{result.overview.substring(0, 300)}...</Overview>
          <Title>Company</Title>
          <Company>
            <h2>Contries</h2>
            <span>
              {result.production_countries &&
                result.production_countries.map((county, index) =>
                  index + 1 === result.production_countries.length
                    ? county.name
                    : `${county.name} / `,
                )}
            </span>
          </Company>
          <Company>
            <h2>Companies</h2>
            <span>
              {result.production_companies &&
                result.production_companies.map((company, index) =>
                  index + 1 === result.production_companies.length
                    ? company.name
                    : `${company.name} / `,
                )}
            </span>
          </Company>
        </Data>
      </Content>
      <Content>
        <ContentWrap>
          {result.videos.results && result.videos.results.length > 0 && (
            <Title>Videos</Title>
          )}
          <VideoContainer>
            {result.videos.results &&
              result.videos.results.map((video, index) => (
                <iframe
                  width="320"
                  height="240"
                  src={`https://www.youtube.com/embed/${video.key}`}
                />
              ))}
          </VideoContainer>
        </ContentWrap>
        <ContentWrap>
          {result.seasons && result.seasons.length > 0 && (
            <Title style={{ padding: '20px 0' }}>Seasons</Title>
          )}
          <SeasonContainer>
            {result.seasons &&
              result.seasons.map((season) => (
                <SeasonWrap>
                  <img
                    src={`http://image.tmdb.org/t/p/w300${season.poster_path}`}
                  />
                  <span>{season.name}</span>
                </SeasonWrap>
              ))}
          </SeasonContainer>
        </ContentWrap>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
