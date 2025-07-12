import { View } from 'react-native';
import getStyles from "@/lib/styles";

type CardListSkeletonProps = {
    numberOfCards?: number
}

export default function CardListSkeleton({ numberOfCards = 7 }: CardListSkeletonProps) {
    const styles = getStyles();

    return (
        (new Array(numberOfCards).fill(null).map((item, index) => (
            <View style={styles.skeletonCard} key={index}>
                <View style={[styles.skeletonCardTitle]} />
                <View style={[styles.skeletonCardValue]} />
                <View style={[styles.skeletonCardDescription]} />
            </View>
        )))
    );
}