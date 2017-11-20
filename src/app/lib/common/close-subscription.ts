import { Subscription } from 'rxjs/Subscription';

export function closeSubscription(sub: Subscription) {
    if(sub && !sub.closed) {
        sub.unsubscribe();
    }
}