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
  height: ${props => (props.h ? '85vh' : '200px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const HomeSecondContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  @media screen and (min-width: 768px) {
    padding-left: 165px;
    padding-right: 165px;
  }
`
export const HomeSliderFailureContainer = styled.div`
  width: ${props => (props.h ? '80%' : '100%')};
  background-color: #0d0d0d;
  height: ${props => (props.h ? ' 55vh' : '200px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${props => (props.h ? '60px' : '0px')};
`
export const AlertImage = styled.img`
  width: 50px;
`
export const AlertError = styled.p`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  color: #ffffff;
`
export const RetryButton = styled.button`
  background-color: #ffffff;
  border-radius: 4px;
  border-width: 0px;
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #171f46;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
`
export const FailureContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
