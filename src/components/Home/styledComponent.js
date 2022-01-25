import styled from 'styled-components'

export const HomeFirstContainer = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url('https://image.tmdb.org/t/p/original/${props =>
    props.path}');
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Heading = styled.h1`
  font-family: Roboto;
`
export const SliderLoaderContainer = styled.div`
  width: 100%;
  background-color: #0d0d0d;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
