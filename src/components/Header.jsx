"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { HiCamera, HiOutlinePlusCircle } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Header = () => {
  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const addImageToPost = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImageFileUrl(URL.createObjectURL(img));
      setFile(img);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImageToStorage();
    }
  }, [file]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, fileName);
    const uplaodTask = uploadBytesResumable(storageRef, file);
    uplaodTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },

      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setFile(null);
      },

      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploading(false);
        });
      }
    );
  }

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden md:inline-flex">
          <Image
            src={""}
            width={96}
            height={96}
            alt="logo"
          />
        </Link>
        <Link href="/" className="md:hidden">
          <Image
            src={""}
            width={40}
            height={40}
            alt="logo"
          />
        </Link>
        {/* search inputs */}

        <input
          type="text"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* menu items */}

        {session ? (
          <div className="flex items-center gap-2">
            <HiOutlinePlusCircle
              size={28}
              onClick={() => setIsOpen(true)}
              className=" cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600"
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className=" text-blue-500 font-semibold text-sm"
          >
            Log In
          </button>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-center items-center h-[100%]">
          {file ? (
            <img
              onClick={() => setFile(null)}
              src={imageFileUrl}
              alt=""
              className={`w-full max-h-[200px] object-cover cursor-pointer ${imageFileUploading ? "animate-pulse" : ""}`}
            />
          ) : (
            <HiCamera
              onClick={() => filePickerRef.current.click()}
              className="text-5xl text-gray-400 cursor-pointer"
            />
          )}
          <input
            type="file"
            hidden
            ref={filePickerRef}
            accept="image/*"
            onChange={addImageToPost}
          />

          <input
            type="text"
            maxLength="150"
            placeholder="Please enter you caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
            // onChange={(e) => setCaption(e.target.value)}
          />

          <button className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>

          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
