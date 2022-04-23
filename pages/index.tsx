import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Blogr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 p-2 md:p-6  justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-6">
        <div className="px-8 space-y-5">
          <h1 className="text-4xl max-w-xl font-serif">
            A place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
          <h3 className="border px-4 py-1 rounded-full  border-white-600 w-40 text-center text-white bg-black">
            Get Started
          </h3>
        </div>
        <div
          id="animation"
          style={{ width: "30rem", justifySelf: "center" }}
          className="px-3 space-y-5 hidden md:block animation"
        >
          <h2
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              border: "9px dashed black",
            }}
          >
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect{" "}
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect
            <span className="text-white">
              Create Write Design Share Connect
            </span>
            Create Write Design Share Connect
          </h2>
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image
  },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
