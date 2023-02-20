/* eslint-disable react/jsx-key*/ // jsx not used with this app
import Head from 'next/head'
import Link from 'next/link'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'
import Movie from '../components/Movie'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function Home(initialData) {
  const [SearchResults, setSearchResults] = useState ([])

  useEffect(() => {
  setSearchResults(initialData.trendingMovies.results)
}, [initialData])

  return (
    <div className='container'>
      <Head>
        <h1>
          <Link href="/">Movies App</Link>
          </h1>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="movie-search-results-grid">
      {SearchResults && SearchResults.map((each, index) => {
        return (
          <Movie
          index={each.id}
          title={each.title}
          poster_path={each.poster_path}
          overview={each.overview}
          />
        )
      })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let trendingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${serverRuntimeConfig.apiKey}`)
 trendingMovies = await trendingMovies.json()
  console.log(trendingMovies)
  return {
    props: {trendingMovies: trendingMovies}, // Will be passed to the page component as props
  }
}