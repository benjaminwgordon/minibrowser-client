import {
  BellIcon as BellEmptyIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { BellIcon as BellFullIcon } from "@heroicons/react/24/solid";

import { useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import deleteAPI from "../API/Delete";
import get from "../API/Get";
import post from "../API/Post";
import IUserTagSubscription from "../API/types/userTagSub";
import { AuthContext } from "../Contexts/UserSession";
import ITag from "../Types/ITag";

interface ISubscribeToTagWidgetProps {
  tagId: number | null;
}

const SubscribeToTagWidget = (props: ISubscribeToTagWidgetProps) => {
  const { tagId } = props;
  const auth = useContext(AuthContext);
  const [tag, setTag] = useState<ITag | undefined>(undefined);
  const [isUserSubscibed, setIsUserSubscibed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubscribe = async () => {
    if (!tagId) {
      console.log("undefined tag");
    } else {
      post<{ tagId: number }, IUserTagSubscription>(`/tags/subscribed`, {
        tagId: tagId,
      })
        .then((res) => {
          if (res) {
            // console.log({ newSub: res });
            setIsUserSubscibed(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUnsubscribe = async () => {
    // console.log("deleting tag id: ", tagId);
    if (!tagId) {
      console.log("undefined tag");
    } else {
      // console.log({ deleteTagId: tagId });
      deleteAPI<{ tagId: number }, ITag>(`/tags/subscribed/${tagId}`, {
        tagId,
      })
        .then((res) => {
          if (res) {
            console.log({ deletedSub: res });
            setIsUserSubscibed(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      get<ITag>(`/tag/${tagId}`)
        .then((res) => {
          // console.log({ res });
          setTag(res);
        })
        .catch((err) => {
          console.log({ err });
        }),
      get<IUserTagSubscription[]>("/tags/subscribed")
        .then((res) => {
          const isUserSubbedToCurrentTag = res.some(
            (tag) => tagId === tag.tagId
          );
          setIsUserSubscibed(isUserSubbedToCurrentTag);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]).then(() => setIsLoading(false));
  }, [tagId]);

  return isLoading ? (
    <RingLoader className="w-6 h-6" />
  ) : (
    <div className="w-full flex flex-row justify-between items-center bg-white text-lg">
      <div className="flex flex-row flex-nowrap">
        <TagIcon className="w-6 h-6" />
        <h3>{tag?.name} posts</h3>
      </div>
      {!isUserSubscibed ? (
        <button
          className="flex flex-row flex-nowrap"
          onClick={() => handleSubscribe()}
        >
          <p>Subscribe</p>
          <BellEmptyIcon className="w-6 h-6 ml-2" />
        </button>
      ) : (
        <button
          className="flex flex-row flex-nowrap"
          onClick={() => handleUnsubscribe()}
        >
          <p>Unsubscribe</p>
          <BellFullIcon className="w-6 h-6 ml-2 text-red" />
        </button>
      )}
    </div>
  );
};

export default SubscribeToTagWidget;
