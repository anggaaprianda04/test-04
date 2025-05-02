import { gql } from '@apollo/client/core';
import instanceApollo from '../apollo/instanceApollo';

export async function getLocations() {
    const query = gql`
        query GetLocations {
            locations {
                id
                name
                latitude
                longitude
            }
        }
    `;

    const response = await instanceApollo.query({ query });
    return response.data;
}