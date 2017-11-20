import { Subscription } from 'rxjs/Rx';

export function closeSubscription(sub: Subscription) {
    if(sub && !sub.closed) {
        sub.unsubscribe();
    }
}