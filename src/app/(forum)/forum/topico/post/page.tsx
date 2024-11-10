'use client';

import React, { useState } from "react";
import { FaComment, FaExclamationTriangle } from "react-icons/fa";

const ForumPost = ({ author, content, time, isTopicAuthor, joinDate, postCount }:any) => {
  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg group">
      <div className="flex items-start mb-2">
        {/* Profile Section */}
        <div className="mr-4 flex flex-col items-center pr-4">
          <div className="w-16 h-16 rounded-full bg-primary mb-2"></div>
          <p className="font-semibold text-sm text-center">{author}</p>
          <p className="text-xs text-gray-500 text-center">{postCount} publicações</p>
          <p className="text-xs text-gray-500 text-center">Entrou em {joinDate}</p>
        </div>
        {/* Post Content Section */}
        <div className="flex-1 pl-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              {isTopicAuthor && (
                <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-green-600 rounded"> AUTOR DO TÓPICO </span>
              )}
              <span className="text-xs text-red-500 ml-2">Há {time}</span>
            </div>
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
             <button className="btn btn-sm btn-outline mr-2" title="Citar publicação na resposta"> 
               <FaComment className="mr-1" />
             </button>
             <button className="btn btn-sm btn-outline btn-error" title="Denunciar publicação"> 
               <FaExclamationTriangle className="mr-1" />
             </button>
            </div>
          </div>
          <div className="mb-4"> 
            <p>{content}</p> 
          </div>
          {/* Edit Message Section */}
          <div className="mt-4 pt-2">
            <div className="text-xs text-red-500"> Última edição por {author.toLowerCase()} há {time}, editado 3 vezes no total. </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForumTopic = () => {
  const [posts, setPosts] = useState([
    {
      author: "User1",
      content: "This is an example of a forum post content.",
      time: "32 horas",
      isTopicAuthor: true,
      joinDate: "junho 2018",
      postCount: 25,
    },
    {
      author: "User2",
      content: "Here is another example post, just for illustration purposes.",
      time: "16 horas",
      isTopicAuthor: false,
      joinDate: "janeiro 2021",
      postCount: 12,
    },
    {
      author: "User3",
      content: "This is a newly added post to the forum topic.",
      time: "10 horas",
      isTopicAuthor: false,
      joinDate: "março 2022",
      postCount: 5,
    },
    {
      author: "User4",
      content: "Another example post to enrich the discussion.",
      time: "5 horas",
      isTopicAuthor: false,
      joinDate: "abril 2023",
      postCount: 8,
    },
  ]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Titulo do Tópico criado pelo usuario: Por que os Fóruns são tão duros?</h1>
      {posts.map((post, index) => (
        <ForumPost
          key={index}
          author={post.author}
          content={post.content}
          time={post.time}
          isTopicAuthor={post.isTopicAuthor}
          joinDate={post.joinDate}
          postCount={post.postCount}
        />
      ))}
    </div>
  );
};

export default ForumTopic;