import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import Head from 'next/head';
import { authState, categoriesState, subCategoriesState } from '../../store';
import { useRecoilState } from 'recoil';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const Home: NextPage = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(authState);
  const [categories, setCategories]: any = useRecoilState(categoriesState); // カテゴリー一覧
  const [subCategories, setSubCategories]: any =
    useRecoilState(subCategoriesState); // サブカテゴリー一覧

  // カテゴリー一覧を取得
  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setCategories(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    console.log('setCategories');
  }, [setCategories]);

  // サブカテゴリー一覧を取得
  useEffect(() => {
    onSnapshot(collection(db, 'subCategories'), (querySnapshot) => {
      setSubCategories(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div>
      <Head>
        <title>DAIMARU-HAKUI</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Home;
