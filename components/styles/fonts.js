import asset from 'next/asset'

export default () => (
  <style jsx global>{`
    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 400;
      font-style: normal;
      font-stretch: normal;
      src:
        url(${asset('/fonts/SourceSansPro/SourceSansPro-Regular.otf.woff2')}) format('woff2'),
        url(${asset('/fonts/SourceSansPro/SourceSansPro-Regular.otf.woff')}) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 400;
      font-style: italic;
      font-stretch: normal;
      src:
        url(${asset('/fonts/SourceSansPro/SourceSansPro-It.otf.woff2')}) format('woff2'),
        url(${asset('/fonts/SourceSansPro/SourceSansPro-It.otf.woff')}) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 700;
      font-style: normal;
      font-stretch: normal;
      src:
        url(${asset('/fonts/SourceSansPro/SourceSansPro-Bold.otf.woff2')}) format('woff2'),
        url(${asset('/fonts/SourceSansPro/SourceSansPro-Bold.otf.woff')}) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 700;
      font-style: italic;
      font-stretch: normal;
      src:
        url(${asset('/fonts/SourceSansPro/SourceSansPro-BoldIt.otf.woff2')}) format('woff2'),
        url(${asset('/fonts/SourceSansPro/SourceSansPro-BoldIt.otf.woff')}) format('woff');
    }

    @font-face {
      font-family: Evolventa;
      font-weight: normal;
      font-style: normal;
      src:
        local('Evolventa'),
        local('Evolventa-Regular'),
        url(${asset('/fonts/Evolventa/Evolventa-Regular.woff')}) format('woff');
    }

    @font-face {
      font-family: Evolventa;
      font-weight: normal;
      font-style: italic;
      src:
        local('Evolventa Oblique'),
        local('Evolventa-Oblique'),
        url(${asset('/fonts/Evolventa/Evolventa-Oblique.woff')}) format('woff');
    }

    @font-face {
      font-family: Evolventa;
      font-weight: bold;
      font-style: normal;
      src:
        local('Evolventa Bold'),
        local('Evolventa-Bold'),
        url(${asset('/fonts/Evolventa/Evolventa-Bold.woff')}) format('woff');
    }

    @font-face {
      font-family: Evolventa;
      font-weight: bold;
      font-style: italic;
      src:
        local('Evolventa Bold Oblique'),
        local('Evolventa-BoldOblique'),
        url(${asset('/fonts/Evolventa/Evolventa-BoldOblique.woff')}) format('woff');
    }
  `}</style>
)
