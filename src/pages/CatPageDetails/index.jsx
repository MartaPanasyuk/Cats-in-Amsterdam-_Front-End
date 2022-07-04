import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCatWithInfo } from "../../store/cat/thunks";
import { selectCatDetails } from "../../store/cat/selectors";
import { selectToken } from "../../store/user/selectors";
import { updayteCatSeenTimes } from "../../store/cat/thunks";
import CommentForm from "../../components/CommentForm";

export default function CatPageDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const token = useSelector(selectToken);

  const catDetails = useSelector(selectCatDetails);

  useEffect(() => {
    dispatch(fetchCatWithInfo(id));
  }, [dispatch, id]);

  if (!catDetails)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div>
      <div key={catDetails.id}>
        <h2>{catDetails.name}</h2>
        <img src={catDetails.picture} alt={catDetails.title} />
        <p>Seen Times:{catDetails.seenTime}</p>{" "}
        <button onClick={() => dispatch(updayteCatSeenTimes(catDetails.id))}>
          Hev You seen me?
        </button>
        {catDetails.images.map((c) => (
          <img src={c.url} alt={catDetails.title} />
        ))}
        {catDetails.comments.map((c) => (
          <p>{c.text}</p>
        ))}
        {token ? (
          <CommentForm />
        ) : (
          <p>You need to Login to leave the comment</p>
        )}
      </div>
    </div>
  );
}

/*
<div>
        <h3>Bids</h3>
        <table>
          <tbody>
            <tr>
              <th>Email</th>
              <th>Bid $</th>
            </tr>
            {artDetails.bids ? (
              [...artDetails.bids]
                .sort((a, b) => a.amount - b.amount)
                .map((det) => {
                  return (
                    <tr key={det.id}>
                      <td>{det.email}</td>
                      <td>{det.amount}</td>
                    </tr>
                  );
                })
            ) : (
              <div>
                <h3>There are no Bids right now</h3>
                <p>
                  The minimum bid that you cam make is : {artDetails.minimumBid}
                </p>
              </div>
            )}
          </tbody>
        </table>
        {token ? <BidForm /> : <p>You need to Login to make a Bid</p>}
      </div>

*/
