import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api';
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react';
import NoNotificationsFound from '../components/NoNotificationsFound';

const NotificationsPage = () => {

  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

   const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  const incomingRequests = friendRequests?.incomingRequest || []
  const acceptedRequests = friendRequests?.acceptedRequest || []
  return (
    <div className="p-4 sm:p-6 lg:p-8">
  <div className="container mx-auto max-w-4xl space-y-6">
    <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Notifications</h1>

    {isLoading ? (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) : (
      <>
        {incomingRequests.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <UserCheckIcon className="h-4 w-4 text-primary" />
              Friend Requests
              <span className="badge badge-primary badge-sm ml-2">{incomingRequests.length}</span>
            </h2>

            <div className="space-y-2.5">
              {incomingRequests.map((request) => (
                <div
                  key={request._id}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="avatar w-11 h-11 rounded-full bg-base-300 flex-shrink-0">
                          <img src={request.sender.profilePic} alt={request.sender.fullName} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm truncate">{request.sender.fullName}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            <span className="badge badge-secondary badge-xs">
                              Native: {request.sender.nativeLanguage}
                            </span>
                            <span className="badge badge-outline badge-xs">
                              Learning: {request.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-xs flex-shrink-0"
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ACCEPTED REQS NOTIFICATONS */}
        {acceptedRequests.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <BellIcon className="h-4 w-4 text-success" />
              New Connections
            </h2>

            <div className="space-y-2.5">
              {acceptedRequests.map((notification) => (
                <div key={notification._id} className="card bg-base-200 shadow-sm">
                  <div className="card-body p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="avatar mt-0.5 size-9 rounded-full flex-shrink-0">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">{notification.recipient.fullName}</h3>
                        <p className="text-xs my-1">
                          {notification.recipient.fullName} accepted your friend request
                        </p>
                        <p className="text-xs flex items-center opacity-70">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          Recently
                        </p>
                      </div>
                      <div className="badge badge-success badge-sm flex-shrink-0">
                        <MessageSquareIcon className="h-3 w-3 mr-1" />
                        New Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationsFound />
        )}
      </>
    )}
  </div>
</div>
  )
}

export default NotificationsPage